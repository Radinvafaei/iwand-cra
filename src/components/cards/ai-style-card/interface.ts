export interface AiStyleCardProps {
  title?: string;
  status: 'in-progress' | 'completed';
  progressMessage?: string;
  subtitle?: string;
  completedMessage?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
