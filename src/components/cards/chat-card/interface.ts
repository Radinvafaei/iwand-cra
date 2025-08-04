export interface ChatCardProps {
  username: string;
  messageCount: string;
  messageTime: string;
  message: string;
  selected?: boolean;
  onClick?: () => void;
}
