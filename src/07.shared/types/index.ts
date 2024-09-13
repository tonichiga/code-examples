type JSONPlaceholderPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type JSONPlaceholderComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type { JSONPlaceholderPost, JSONPlaceholderComment };
