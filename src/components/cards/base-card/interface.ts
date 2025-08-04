export interface BaseCardProps {
  title?: string;
  completed?: boolean;
  progressMessage?: string;
  subtitle?: string;
  completedMessage?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}
