import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { createApp } from "@shopify/app-bridge";
import { getAppConfig } from "src/providers/appProvider";

const httpClient = axios.create({
  baseURL: "https://orchestrator.iwand.style/api",
});

httpClient.interceptors.request.use(async (config) => {
  try {
    const appConfig = getAppConfig();
    const sessionToken = await getSessionToken(createApp(appConfig));
    config.headers.Authorization = `Bearer ${sessionToken}`;
  } catch (err) {
    console.error("Failed to get session token:", err);
  }
  return config;
});

export default httpClient;
