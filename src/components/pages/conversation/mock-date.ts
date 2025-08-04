import { Product, Message } from 'src/components/chat-container';

export const mockProducts: Product[] = [
  {
    title: 'Alice + Olivia',
    styleName: 'Lucy Mini Shirt Dress',
    imageUrl: '/assets/image/modelImage.png',
    price: '$1,790',
  },
  {
    title: 'Sau Lee',
    styleName: 'Rochelle Maxi Dress',
    imageUrl: '/assets/image/modelImage.png',
    price: '$3,650',
  },
  {
    title: 'Alexandra Miro',
    styleName: 'Jasmine Long Dress',
    imageUrl: '/assets/image/modelImage.png',
    price: '$7,140',
  },
];

export const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: '1',
      text: "Tell me for where you're going to wear this dress?",
      sender: 'agent',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      text: 'The occasion is party',
      sender: 'user',
      timestamp: '10:01 AM',
    },
    {
      id: '3',
      text: 'Ok, tell me your body type, it helps me to find better dress?',
      sender: 'agent',
      timestamp: '10:02 AM',
    },
    {
      id: '4',
      text: 'My body type is pear',
      sender: 'user',
      timestamp: '10:03 AM',
    },
    {
      id: '5',
      text: 'My suggestion for you is the following dresses, which could be a good fit for a party based on your style. What do you think?',
      sender: 'agent',
      timestamp: '10:04 AM',
    },
  ],
  2: [
    {
      id: '1',
      text: "You've picked a stylish dress! Do you have any questions or concerns about your purchase that I can help with?",
      sender: 'agent',
      timestamp: '2:00 PM',
    },
    {
      id: '2',
      text: 'Does it match my Nude makeup?',
      sender: 'user',
      timestamp: '2:01 PM',
    },
    {
      id: '3',
      text: 'I think this dress paired with nude makeup for the party. The patterns of blouse combined with neutral tones and I recommend a beige base with peach-toned lipstick for you.',
      sender: 'agent',
      timestamp: '2:02 PM',
    },
  ],
};

export const mockChats = [
  {
    id: 1,
    username: 'Emily Johnson',
    message: 'Does it match my nude ma...',
    messageTime: '5 min ago',
    messageCount: '16',
    agentName: 'Inspiration Agent',
    status: 'viewed' as const,
    date: 'today',
    productInfo: {
      name: 'Lucy Mini Shirt Dress',
      image: '/assets/image/modelImage.png',
      price: '$1,790',
    },
    showProducts: true,
    purchaseData: null,
    userInfo: {
      name: 'Emily Johnson',
      email: 'emily9008@gmail.com',
      phone: '(123) 456-7890',
      location: 'California, USA',
      device: 'Mobile Device',
    },
  },
  {
    id: 2,
    username: 'Sara Anderson',
    message: 'I want a blouse to match with my skin',
    messageTime: '7 min ago',
    messageCount: '20',
    agentName: 'Suits Me Agent',
    status: 'purchased' as const,
    date: 'yesterday',
    productInfo: {
      name: 'Rochelle Maxi Dress',
      image: '/assets/image/modelImage.png',
      price: '$3,650',
    },
    showProducts: false,
    purchaseData: {
      orderID: '1289765',
      date: '12/07/025',
      total: '$6,290',
      items: [
        {
          name: 'Alice + Olivia',
          price: '$1,790',
          imageUrl: '/assets/image/modelImage.png',
        },
        {
          name: 'Jimmy Choo',
          price: '$4,500',
          imageUrl: '/assets/image/modelImage.png',
        },
      ],
    },
    userInfo: {
      name: 'Sara Anderson',
      email: 'sara.anderson@gmail.com',
      phone: '(555) 123-4567',
      location: 'New York, USA',
      device: 'Desktop',
    },
  },
];
