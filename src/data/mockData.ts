
export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: number;
  createdAt: string;
  comments: Comment[];
}

export const users: User[] = [
  {
    id: "1",
    username: "foodlover123",
    profilePicture: "/placeholder.svg"
  },
  {
    id: "2",
    username: "chefsdelight",
    profilePicture: "/placeholder.svg"
  },
  {
    id: "3",
    username: "tastytreats",
    profilePicture: "/placeholder.svg"
  }
];

export const posts: Post[] = [
  {
    id: "1",
    userId: "1",
    content: "Just made the most amazing homemade pasta! The secret is in the sauce 🍝",
    image: "/placeholder.svg",
    likes: 24,
    createdAt: "2025-04-23T14:30:00Z",
    comments: [
      {
        id: "101",
        userId: "2",
        postId: "1",
        content: "That looks incredible! Would love to get the recipe.",
        createdAt: "2025-04-23T15:05:00Z"
      },
      {
        id: "102",
        userId: "3",
        postId: "1",
        content: "Beautiful plating! What kind of sauce is that?",
        createdAt: "2025-04-23T15:45:00Z"
      }
    ]
  },
  {
    id: "2",
    userId: "2",
    content: "Tried a new sourdough recipe this weekend. The crumb is perfect! 🍞",
    image: "/placeholder.svg",
    likes: 18,
    createdAt: "2025-04-22T09:15:00Z",
    comments: [
      {
        id: "103",
        userId: "1",
        postId: "2",
        content: "That's some serious bread goals right there!",
        createdAt: "2025-04-22T10:20:00Z"
      }
    ]
  },
  {
    id: "3",
    userId: "3",
    content: "Found this amazing little bistro downtown. Their crème brûlée is to die for! 🍮",
    image: "/placeholder.svg",
    likes: 31,
    createdAt: "2025-04-21T18:45:00Z",
    comments: []
  }
];

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const findPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const getPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};
