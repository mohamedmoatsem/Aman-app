export interface Resource {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  category: string;
  createdAt: string;
}

export interface Workshop {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  date: string;
  location: string;
  createdAt: string;
}

export interface CommunityPost {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export interface CreateCommunityPostInput {
  title: string;
  content: string;
  authorName: string;
}
