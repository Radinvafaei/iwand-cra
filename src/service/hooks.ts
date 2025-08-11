import {useMutation, useQuery} from "@tanstack/react-query";
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
    IGetActiveTabsResponse, IGetPlansLinkResponse
} from "./interface";
import {AxiosResponse} from "axios";

export const useGetAgentUsage = (shop: string) => useQuery<AxiosResponse<IAgentsUsageResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/agents-usage',
        params: {shop}
    }),
    queryKey: ['agent-usage', shop]
})

export const useGetInsights = (params: TInsightsParams) => useQuery<AxiosResponse<IGetInsightsResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/insights',
        params,
    }),
    queryKey: ['insights', params]
})

export const useConversationUsage = (shop: string) => useQuery<AxiosResponse<IGetConversationUsageResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/conversation-usage',
        params: {shop},
    }),
    queryKey: ['conversation-usage', shop]
})

export const useConversations = (params: IGetConversationsParams) => useQuery<AxiosResponse<IGetConversations>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/conversations',
        params,
    }),
    queryKey: ['conversations', params]
})

export const useGetAnalytics = (params: IAnalyticsParams) => useQuery<AxiosResponse<IGetAnalyticsResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/insights',
        params,
    }),
    queryKey: ['insights', {params}]
})

export const useGetAgentsConfig = (shop: string) => useQuery<AxiosResponse<IGetAgentConfigResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/agents-config',
        params: {shop},
    }),
    queryKey: ['agents-config', shop]
})

export const usePostAgentConfigToggle = (data: IPostAgentConfigTogglePayload) => useMutation({
    mutationFn: async () => httpClient.request({
        method: "POST",
        url: '/agents-config/toggle',
        data,
    })
})

export const usePostAgentConfigToggleWidget = (data: IPostAgentConfigToggleWidgetPayload) => useMutation({
    mutationFn: async () => httpClient.request({
        method: "POST",
        url: '/agents-config/widget-toggle',
        data
    })
})

export const useGetActiveTabs = (name: string) => useQuery<AxiosResponse<IGetActiveTabsResponse>>({
    queryFn: async () => httpClient.request({
        method: 'GET',
        url: '/shop/active-tabs',
        params: {name},
    }),
    queryKey: ['active_tabs', name],
})

export const useGetPlansLink = (name: string) => useQuery<AxiosResponse<IGetPlansLinkResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: `/mantle/plans-url`,
        params: {name},
    }),
    queryKey: ['plans', name],
})