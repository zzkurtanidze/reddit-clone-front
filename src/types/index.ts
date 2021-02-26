export type PostType = {
  _id: string;
  title: string;
  body: string;
  image: string;
  postedTo: any;
  postedBy: UserType;
  postedAt: string;
  votes: number;
};

export type NotPostedPostType = {
  title: string;
  body: string;
  image: string;
  postedTo: string;
};

export type UserType = {
  _id?: string;
  username: string;
  description?: string;
  email: string;
  password: string;
  image?: string;
  coverImage?: string;
  followers?: [string];
  following?: [string];
  likedPosts?: [PostType];
  dislikedPosts?: [PostType];
  joined?: [CommunityType];
};

export type CommunityType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  members: [UserType];
  posts: [PostType];
};
