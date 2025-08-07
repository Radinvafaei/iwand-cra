import {IMessage, IMessageProduct} from "src/service/interface";

export const conversationConvertor = (messages?: IMessage[]): IAIChats[] => {
    const convertedMessage: IAIChats[] = [];
    if (!messages) return convertedMessage;

    let currentGroup: IAIChats | null = null;
    let currentAgent: string | null = null;

    for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i];

        const chatMessage: IChatMessages = {
            type: message.type as 'bot' | 'user',
            content: message.content,
            created_at: message.timestamp,
            message_type: message.message_type as IChatMessages["message_type"],
            products: message.products || []
        };

        if (message.type === 'bot') {
            if (message.agent !== currentAgent) {
                if (currentGroup) {
                    convertedMessage.unshift(currentGroup);
                }
                currentAgent = message.agent;
                currentGroup = {
                    id: message.id,
                    agent: currentAgent,
                    messages: []
                };
            }

            currentGroup?.messages.unshift(chatMessage);

        } else if (message.type === 'user') {
            if (!currentGroup) {
                currentAgent = 'unknown_agent';
                currentGroup = {
                    id: '',
                    agent: currentAgent,
                    messages: []
                };
            }

            currentGroup.messages.unshift(chatMessage);
        }
    }

    if (currentGroup) {
        convertedMessage.unshift(currentGroup);
    }

    return convertedMessage;
};

export interface IAIChats {
    agent: string;
    id: string;
    messages: IChatMessages[]
}

export interface IChatMessages {
    type: 'bot' | 'user';
    content: string;
    created_at: string;
    message_type: "text_with_products" | "product_recommendation" | "image_analysis";
    products: IMessageProduct[]
}
