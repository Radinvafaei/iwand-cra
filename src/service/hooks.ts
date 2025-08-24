import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "./client";
import {
  IGetConversationsParams,
  IAnalyticsParams,
  TInsightsParams,
  IAgentsUsageResponse,
  IGetInsightsResponse,
  IGetConversationUsageResponse,
  IGetConversations,
  IGetAnalyticsResponse,
  IGetAgentConfigResponse,
  IPostAgentConfigTogglePayload,
  IPostAgentConfigToggleWidgetPayload,
  IGetActiveTabsResponse,
  IGetPlansLinkResponse,
  IGetProductsProcessed,
  IGetShowPlansResponse,
  IPublishPayload,
  IPublishResponse,
} from "./interface";
import { AxiosResponse } from "axios";

export const useGetAgentUsage = (shop: string) =>
  useQuery<AxiosResponse<IAgentsUsageResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/agents-usage",
        params: { shop },
      }),
    queryKey: ["agent-usage", shop],
  });

export const useGetInsights = (params: TInsightsParams) =>
  useQuery<AxiosResponse<IGetInsightsResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/insights",
        params,
      }),
    queryKey: ["insights", params],
  });

export const useConversationUsage = (shop: string) =>
  useQuery<AxiosResponse<IGetConversationUsageResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/conversation-usage",
        params: { shop },
      }),
    queryKey: ["conversation-usage", shop],
  });

export const useConversations = (params: IGetConversationsParams) =>
  useQuery<AxiosResponse<IGetConversations>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/conversations",
        params,
      }),
    queryKey: ["conversations", params],
  });

export const useGetAnalytics = (params: IAnalyticsParams) =>
  useQuery<AxiosResponse<IGetAnalyticsResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/insights",
        params,
      }),
    queryKey: ["insights", { params }],
  });

export const useGetAgentsConfig = (shop: string) =>
  useQuery<AxiosResponse<IGetAgentConfigResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/agents-config",
        params: { shop },
      }),
    queryKey: ["agents-config", shop],
  });

export const usePostAgentConfigToggle = (data: IPostAgentConfigTogglePayload) =>
  useMutation({
    mutationFn: async () =>
      httpClient.request({
        method: "POST",
        url: "/agents-config/toggle",
        data,
      }),
  });

export const usePostAgentConfigToggleWidget = (
  data: IPostAgentConfigToggleWidgetPayload
) =>
  useMutation({
    mutationFn: async () =>
      httpClient.request({
        method: "POST",
        url: "/agents-config/widget-toggle",
        data,
      }),
  });

export const useGetActiveTabs = (shop: string) =>
  useQuery<AxiosResponse<IGetActiveTabsResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: "/shop/active-tabs",
        params: { shop },
      }),
    queryKey: ["active_tabs", shop],
  });

export const useGetPlansLink = (shop: string) =>
  useQuery<AxiosResponse<IGetPlansLinkResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: `/mantle/plans-url`,
        params: { shop },
      }),
    queryKey: ["plans", shop],
  });

export const useGetProductsProcessed = (shop: string) =>
  useQuery<AxiosResponse<IGetProductsProcessed>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: `/products-processed`,
        params: { shop },
      }),
    refetchInterval: 60_000,
    queryKey: ["products-processed", shop],
  });

export const useShowPlans = (shop: string) =>
  useQuery<AxiosResponse<IGetShowPlansResponse>>({
    queryFn: async () =>
      httpClient.request({
        method: "GET",
        url: `/show-plans`,
        params: { shop },
      }),
    queryKey: ["show-plans", shop],
    enabled: false,
  });

export const usePublish = (data: IPublishPayload) =>
  useMutation<AxiosResponse<IPublishResponse>>({
    mutationFn: async () =>
      httpClient.request({
        method: "POST",
        url: `/update-publish-status`,
        data,
      }),
    mutationKey: ["update-publish-status", data],
  });

export const useCheckPublishStatus = (shop: string) =>
  useQuery<AxiosResponse<any>>({
    queryFn: async () =>
      httpClient.get("/check-publish-status", { params: { shop } }),
    queryKey: ["is-published", shop],
  });
