interface Notification {
  title: string;
  icon: string;
  description: string;
  minValue?: number;
  maxValue?: number;
  minVariation?: number;
  maxVariation?: number;
}

export default function useNotifications() {
  const notifications = useState<Notification[]>("notification", () => [
    {
      title: "Electric Bill Due",
      icon: "i-lucide-bell",
      description: "Electric Bill Due on September 1 2025",
      minValue: 400,
      maxValue: 1000,
      minVariation: 15,
      maxVariation: 25,
    },
    {
      title: "John Doe",
      icon: "i-lucide-bell",
      description: "Submitted a new expense report",
    },
  ]);

  return {
    notifications,
  };
}
