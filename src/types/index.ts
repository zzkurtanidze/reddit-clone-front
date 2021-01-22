export type PostType = {
  title: string;
  body: string;
  image: string;
  postedTo: string;
  postedBy: string;
  upVotes: number;
};

export type UserType = {
  username: string;
  description: string;
  email: string;
  password: string;
  birthday: Date;
  image: string;
  cover: string;
  followers: UserType;
  following: UserType;
  likedPosts: PostType;
};
