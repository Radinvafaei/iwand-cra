export interface TInsightsParams {
    shop: string;
    time_period: TTimePeriods
}

export type TTimePeriods = 'all_time' | '12_months' | '30_days' | '7_days' | '24_hour'

export interface IGetConversationsParams {
    shop: string;
    limit: number;
    offset: number;
}

export interface IAnalyticsParams {
    shop: string;
    time_period: TTimePeriods
}
export interface IAgentsUsageResponse {
    shop: string;
    agents: IAgentUsage[]
}
export interface IAgentUsage {
    name: string;
    usage: IUsage[];
}

export interface IUsage {
    date: string;
    count: number;
}
