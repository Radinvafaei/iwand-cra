export interface SectionHeaderProps {
  title: string;
  onDeactivateAll: () => void;
  onActivateAll: () => void;
  totalCount: number;
  showDivider?: boolean;
}
