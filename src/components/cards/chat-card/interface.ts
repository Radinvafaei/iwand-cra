export interface ChatCardProps {
  username: string;
  messageCount: number;
  messageTime: string;
  message: string;
  selected?: boolean;
  onClick?: () => void;
}
