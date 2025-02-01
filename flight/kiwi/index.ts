import axios, { AxiosInstance, AxiosResponse } from "axios";

export class KiwiAPI {
  private static readonly BASE_URL: string = "https://api.tequila.kiwi.com";
  private static readonly API_KEY: string = process.env.KIWI_API_KEY || "";

  private _session: AxiosInstance;

  constructor() {
    if (!KiwiAPI.API_KEY) {
      throw new Error("API key must be set in the environment variables");
    }
    this._session = this._setupSession();
  }

  private _setupSession(): AxiosInstance {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      apiKey: KiwiAPI.API_KEY,
    };
    return axios.create({
      baseURL: KiwiAPI.BASE_URL,
      headers,
    });
  }

  private async _makeRequest(
    method: "GET" | "POST",
    endpoint: string,
    params?: any,
  ): Promise<any> {
    try {
      const response: AxiosResponse = await this._session.request({
        method,
        url: endpoint,
        params,
      });

      if (response.status >= 400) {
        throw new Error(
          `Request failed: ${response.status} - ${response.statusText}`,
        );
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Request failed: ${error.message}`);
      }
      throw error;
    }
  }

  public async search(params: any): Promise<any> {
    console.log("DEBUG: Making the request");
    return this._makeRequest("GET", "/v2/search", params);
  }

  public async location(params: any): Promise<any> {
    return this._makeRequest("GET", "/locations/query", params);
  }
}
