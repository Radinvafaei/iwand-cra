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

export interface IGetInsightsResponse {
    shop: string;
    time_period: TTimePeriods
    insights: IInsight[]
}

export interface IInsight {
    metric: string,
    with_iwand: string,
    original: string,
    icon: string
}

export interface IGetConversationUsageResponse {
    shop: string,
    usage: {
        current: number,
        limit: number,
        percentage: number,
        remaining: number
    },
    period: {
        type: string,
        reset_date: string
    }
}

export interface IGetConversations {
    shop: string;
    summary: {
        total_conversations: number,
        total_users: number,
        total_products_recommended: number,
        total_products_viewed: number,
        total_products_purchased: number,
        conversion_rate: number,
        view_rate: number
    },
    pagination: {
        limit: number,
        offset: number,
        has_more: boolean,
    },
    conversations: IConversation[]
}

export interface IConversation {
    id: string,
    user: {
        id: string,
        type: string,
        name: string,
        email: string,
        phone: string,
        location: string
    },
    "messages": IMessage[],
    "start_time": string,
    "last_activity": string,
    "duration_minutes": number,
    "total_messages": number,
    "agents_used": [
        string,
        string
    ],
    "products_recommended": number,
    "products_viewed": number,
    "products_purchased": number,
    "status": string
}

export interface IMessage {

}

export interface IGetAnalyticsResponse {
    shop: string,
    time_period: TTimePeriods,
    sales: {
        total: number,
        percentage_increase: number,
        breakdown: {
            iwand: {
                amount: number,
                percentage: number, original: {
                    amount: number,
                    percentage: number
                }
            }
        },
        conversion_funnel: {
            stages: [
                "session_start",
                "product_list",
                "product_page",
                "add_to_cart",
                "purchases"
            ],
            data: {
                session_start: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                product_list: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                product_page: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                add_to_cart: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                purchases: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                }
            }
        },
        retention: {
            iwand: number,
            original: number,
            total: number
        },
        aov: {
            iwand: number,
            original: number,
            total: number
        },
        data_analysis: {
            segments: [
                "With iWAND",
                "Original",
                "Total"
            ],
            stages: [
                "session_start",
                "product_list",
                "product_page",
                "add_to_cart",
                "purchases"
            ],
            table_data: {
                session_start: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                product_list: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                product_page: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                add_to_cart: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                },
                purchases: {
                    iwand: {
                        users: number,
                        conversion_rate: number
                    },
                    original: {
                        users: number,
                        conversion_rate: number
                    },
                    total: {
                        users: number,
                        conversion_rate: number
                    }
                }
            }
        }
    }
}

export interface IGetAgentConfigResponse {
    shop: "test.myshopify.com",
    general_agents: {
        "Inspire Me": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        },
        "Pair Up": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        },
        "Find It": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        },
        "Snap & Match": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        }
    },
    product_agents: {
        "Suits Me": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        },
        "Style Idea": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        },
        "Find Similar": {
            name: string,
            type: string,
            activated: boolean,
            description: string,
            icon: string,
            last_updated: string
        }
    },
    widget_activated: boolean
}

export interface IPostAgentConfigTogglePayload {
    shop: string;
    agent_name: string;
    action: 'activate' | 'deactivate';
}
export interface IPostAgentConfigToggleWidgetPayload {
    shop: string;
    action: 'activate' | 'deactivate';
}

export interface IGetActiveTabsResponse {
    "success": true,
    "shop_domain": "wand-test-store.myshopify.com",
    "active_tabs": Tabs[],
    "subscription_status": "inactive",
    "processing_status": "completed",
    "is_published": true
}

export enum Tabs {
    Dashboard,
    Customization,
    "Agent Config",
    Testing,
    Conversation,
    Plans
}

export interface IGetPlansLinkResponse {
    "success": boolean,
    "message": string,
    "plans_url": string,
    "shop_domain": string,
}