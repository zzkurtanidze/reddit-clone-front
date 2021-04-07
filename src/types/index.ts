export type PostType = {
  _id: string;
  title: string;
  body: string;
  image?: string;
  url?: string;
  urlData: {
    contentType: string;
    description: string;
    favicons: [string | undefined];
    images: [string | undefined];
    mediaType: string;
    siteName: string;
    title: string;
    url: string;
    videos: [string];
  };
  postedTo: any;
  postedBy: UserType;
  postedAt: string;
  votes: number;
  hideVotes: boolean;
  date: number;
};

export type NotPostedPostType = {
  title: string;
  body?: string;
  image?: string;
  postedTo?: string;
};

export type UserType = {
  _id?: string;
  username: string;
  displayName?: string;
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
  createdCommunities?: [CommunityType];
  drafts?: [NotPostedPostType];
};

export type CommunityType = {
  _id: string;
  name: string;
  username: string;
  description: string;
  image: string;
  members: [UserType];
  posts: [PostType];
  createdAt: string;
  createdBy: UserType;
  moderators: [UserType];
};
