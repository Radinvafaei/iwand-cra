export interface AgentConfigCardProps {
  icon?: any;
  title: string;
  description: string;
  isActivated: boolean;
  onDeactivate: () => void;
  onActivate: () => void;
  iconColor?: string;
  onCardDeactivate?: () => void;
}
