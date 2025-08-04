import {useQuery} from "@tanstack/react-query";
import httpClient from "./client";
import {IGetConversationsParams, IAnalyticsParams, TInsightsParams, IAgentsUsageResponse} from "./interface";
import {AxiosResponse} from "axios";

export const useGetAgentUsage = (shop: string) => useQuery<AxiosResponse<IAgentsUsageResponse>>({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/agents-usage',
        params: {shop}
    }),
    queryKey: ['agent-usage', shop]
})

export const useGetInsights = (params: TInsightsParams) => useQuery({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/insights',
        params,
    }),
    queryKey: ['insights', params]
})

export const useConversationUsage = (shop: string) => useQuery({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/conversation-usage',
        params: {shop},
    }),
    queryKey: ['conversation-usage', shop]
})

export const useConversations = (params: IGetConversationsParams) => useQuery({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/conversations',
        params,
    }),
    queryKey: ['conversations', params]
})

export const useGetAnalytics = (params: IAnalyticsParams) => useQuery({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/insights',
        params,
    }),
    queryKey: ['insights', {params}]
})

export const useGetAgentsConfig = (shop: string) => useQuery({
    queryFn: async () => httpClient.request({
        method: "GET",
        url: '/agents-config',
        params: {shop},
    }),
    queryKey: ['agents-config', shop]
})
