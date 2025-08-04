export interface PurchaseItem {
  name: string;
  price: string;
  imageUrl?: string;
}

export interface PurchaseCardProps {
  orderID: string;
  date: string;
  total: string;
  items?: PurchaseItem[];
  onClick?: () => void;
}
