export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

export interface Product {
  title: string;
  styleName: string;
  imageUrl: string;
  price: string;
}

export interface ChatContainerProps {
  messages: Message[];
  status?: 'viewed' | 'purchased';
  productInfo?: {
    name: string;
    image: string;
    price?: string;
  };
  agentName?: string;
  products?: Product[];
  date: string;
}
