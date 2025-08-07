import {IChatMessages} from "../pages/conversation/convertor";

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

