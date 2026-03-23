export interface Order {
  id: string;
  type: "Storybook" | "Movie" | "Combo";
  childName: string;
  date: string;
  status: "Pending" | "In Production" | "Shipped" | "Delivered";
  estimatedDelivery: string;
  image: string;
}

export const ORDERS: Order[] = [
  {
    id: "ORD-84920",
    type: "Storybook",
    childName: "Emma",
    date: "Oct 12, 2023",
    status: "In Production",
    estimatedDelivery: "Oct 24, 2023",
    image: "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwY2hpbGRyZW4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "ORD-84815",
    type: "Movie",
    childName: "Liam",
    date: "Sep 28, 2023",
    status: "Delivered",
    estimatedDelivery: "Oct 10, 2023",
    image: "https://images.unsplash.com/photo-1725354870984-e97f219247b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMGNoaWxkcmVuJTIwbW92aWUlMjBwb3N0ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "ORD-85012",
    type: "Combo",
    childName: "Sophia",
    date: "Nov 02, 2023",
    status: "Pending",
    estimatedDelivery: "Nov 14, 2023",
    image: "https://images.unsplash.com/photo-1598618137594-8e7657a6ef6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwY2hpbGRyZW4lMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczOTM0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

/** Lookup an order by its ID. Returns undefined if not found. */
export function getOrderById(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}
