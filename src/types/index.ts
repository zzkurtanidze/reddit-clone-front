export type PostType = {
  _id?: string;
  title: string;
  body: string;
  image: string;
  postedTo: string;
  postedBy: string;
  votes: number;
};

export type UserType = {
  _id?: string;
  username: string;
  description?: string;
  email: string;
  password: string;
  image?: string;
  cover?: string;
  followers?: [string];
  following?: [string];
  likedPosts?: [string];
  joined?: [string];
};
