import {
  HandlerContext,
  StartEvent,
  StopEvent,
  Workflow,
  WorkflowEvent,
} from "@llamaindex/workflow";
import { ChatMessage, Gemini } from "llamaindex";
//@ts-ignore
import { ResultMessage } from "@/lib/types";
import { KiwiAPI } from "./kiwi";
import { FlightSearchParams, FlightSearchResult } from "./kiwi/types";

// define the events
class PrepEvent extends WorkflowEvent<ChatMessage | null> {}

class EvaluateEvent extends WorkflowEvent<ChatMessage[]> {}

class SearchEvent extends WorkflowEvent<object> {}

// define our configs
const kiwi = new KiwiAPI();

type Context = {
  llm: Gemini;
  error: number;
  memory: ChatMessage[];
  systemPrompt: ChatMessage;
};

// define the steps

const on_init = async (
  ctx: HandlerContext<Context>,
  ev: StartEvent<ChatMessage[]>,
) => {
  // put the system msg
  ctx.data.memory = [ctx.data.systemPrompt, ...ev.data];
  return new PrepEvent(null);
};

const prepare = async (ctx: HandlerContext<Context>, ev: PrepEvent) => {
  if (ctx.data.error >= 3)
    return new StopEvent({
      role: "assistant",
      content: "Sorry, I Failed multiple times",
      isFinal: false,
    });

  if (ev.data) ctx.data.memory.push(ev.data);
  return new EvaluateEvent(ctx.data.memory);
};

const evaluate = async (ctx: HandlerContext<Context>, ev: EvaluateEvent) => {
  const response = await ctx.data.llm.chat({ messages: ev.data });
  const content = response.message.content as string;
  // parse the output
  const pattern = /\{[\s\S]*\}/;
  const match = content.match(pattern);

  if (!match)
    return new PrepEvent({
      role: "system",
      content: "Make sure to respect the output format",
    });

  try {
    const params = JSON.parse(match[0]);
    if (params.action == "question")
      return new StopEvent({
        role: "assistant",
        content: params.input,
        isFinal: false,
      });

    return new SearchEvent(FlightSearchParams.parse(params.input));
  } catch (error) {
    ctx.data.error++;
    return new PrepEvent({
      role: "system",
      content: `${error}`,
    });
  }
};

const search = async (ctx: HandlerContext<Context>, ev: SearchEvent) => {
  const params = ev.data;
  try {
    const result = await kiwi.search(params);
    const parsed = FlightSearchResult.safeParse(result);
    return new StopEvent({
      role: "assitant",
      content: parsed.data?.data || result.data,
      isFinal: true,
    });
  } catch (error) {
    ctx.data.error++;
    return new PrepEvent({ role: "system", content: `${error}` });
  }
};

// adding steps
const flyAgent = new Workflow<Context, ChatMessage[], ResultMessage>();

flyAgent
  .addStep(
    {
      inputs: [StartEvent<ChatMessage[]>],
      outputs: [PrepEvent],
    },
    on_init,
  )
  .addStep(
    {
      inputs: [PrepEvent],
      outputs: [EvaluateEvent, StopEvent],
    },
    prepare,
  )
  .addStep(
    {
      inputs: [EvaluateEvent],
      outputs: [PrepEvent, StopEvent, SearchEvent],
    },
    evaluate,
  )
  .addStep(
    {
      inputs: [SearchEvent],
      outputs: [StopEvent, PrepEvent],
    },
    search,
  );

export default flyAgent;
