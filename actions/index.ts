"use server";

import { Payload } from "@/lib/types";
import { fetcher } from "@/lib/utils";

const endpoint = process.env.BACKEND_URL;
const deployment = process.env.BACKEND_DEPLOYMENT;
const base_url = `${endpoint}/deployments/${deployment}`;

export const create_session = async (): Promise<string> => {
  const url = `${base_url}/sessions/create`;
  console.log(url);
  const session = await fetcher(url, { method: "POST" });
  return session.session_id;
};

export const create_task = async (
  data: Payload,
  session_id?: string,
): Promise<string> => {
  let url = `${base_url}/tasks/run`;
  if (session_id) url += `?session_id=${session_id}`;
  const payload = {
    input: JSON.stringify(data),
  };
  const result = await fetcher(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result;
};
