/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";
import { UserType } from "../types";
import useSWR, { useSWRInfinite } from "swr";

const apiUrl = process.env.REACT_APP_API_URL;

const axiosOptions = {
  withCredentials: true,
};

//@ts-ignore
const fetcher = (url: string) =>
  axios(url, axiosOptions).then((res) => res.data);

/**
 *
 * @param post
 * @returns Created post
 */

export const newPost = async (post: {
  title: string;
  body: string;
  image?: string;
  url?: string;
  postedTo: { value: string; label: string };
  hideVotes: boolean;
  category?: [string];
  flair: any;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/posts`,
      {
        title: post.title,
        body: post.body,
        image: post.image && post.image,
        url: post.url && post.url,
        postedTo: post.postedTo.value,
        hideVotes: post.hideVotes,
        category: post.category,
        flair: post.flair,
      },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @returns all Posts.
 */

export function getPosts() {
  const getKey = (page: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${apiUrl}/posts?page=${page ? page : 0}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  return {
    data,
    isLoading: !error && !data,
    size,
    setSize,
    error,
  };
}

export function getPostsByCommunity(communityUsername: string) {
  const { data, error } = useSWR(
    `${apiUrl}/posts/community/${communityUsername}`, fetcher
  );

  return {
    posts: data,
    isLoading: !error && !data,
    error,
  };
}

export const removePostById = async (postId: string) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/posts/${postId}`,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param id
 * @returns Post with given id.
 */

export function getPostById(id: string) {
  const { data, error } = useSWR(`${apiUrl}/posts/${id}`, fetcher, {
    errorRetryCount: 0,
    shouldRetryOnError: false,
  });

  return {
    post: data,
    isLoading: !error && !data,
    error: error,
  };
}

export function getTrendingPosts() {
  const { data, error } = useSWR(`${apiUrl}/posts/trending`, fetcher);

  return {
    posts: data,
    isLoading: !error && !data,
    error,
  };
}

export const getNotifications = () => {
  const { data, error } = useSWR(`${apiUrl}/users/notifications`, fetcher);

  return {
    notifications: data?.notifications,
    unread: data?.unread,
    isLoading: !error && !data,
    error,
  };
};

export const saveDraftPost = async (post: {}) => {
  try {
    const response = await axios.post(`${apiUrl}/drafts/`, post, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getDraftPosts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/drafts/`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const removeDraftPost = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/drafts/${id}`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

// Users

/**
 *
 * @param user - User information
 * Example:
 * {
 *   "username": "zura12337"
 *   "email": "zura.kurta@gmail.com"
 *   "password": "qawsedrf"
 * }
 *
 */

export const register = async (user: UserType) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, user, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param email - string
 *   Typed email during registration.
 */

export const checkUser = async (email: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/check`,
      { email },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/update-password`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param { username: string, email: string }
 * @returns
 */

export const resetPassword = async (data: {
  username: string;
  email: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/reset-password`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const updateActiveStatus = async ({ active }: { active: boolean }) => {
  try {
    const response = await axios.put(
      `${apiUrl}/users/activeStatus`,
      { active },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param to username
 * @param data
 * @returns
 */

export const sendNotification = async (
  to: string,
  data: {
    title: string;
    description: string;
    type: string;
    more: { community?: string; url?: string };
  }
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/notification/${to}`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const seenNotification = async (id: string) => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/users/seen/${id}`,
      axiosOptions
    );
    return { unread: data.unread, notifications: data.notifications };
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param { password: string, userId: string }
 * @returns string
 */

export const submitNewPassword = async (data: {
  password: string;
  userId: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/reset-password/submit`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const updateMail = async (data: {
  password: string;
  newEmail: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/update-mail`,
      data,
      axiosOptions
      );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const updateUser = async (data: {}) => {
  try {
    const response = await axios.put(`${apiUrl}/users/`, data, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const verifyMail = async () => {
  try {
    const response = await axios.post(`${apiUrl}/users/request-confirm-email`, null, axiosOptions); 
    return response;
  } catch(ex) {
    return ex.response;
  }
}

/**
 *
 * @param id - User id etc. 601ac04225644d90b1f23fbc
 *
 * Without params this function will return current user information
 *
 */
export function getUser(username = undefined) {
  const { data, error } = useSWR(
    `${apiUrl}/users/${username ? username : "me"}`,
    fetcher
  );
  return {
    user: data,
    isLoading: !data && !error,
    error,
  };
}

/**
 *
 * @param id
 * @returns
 */
export const getUserRole = (username?: string) => {
  const { data, error } = useSWR(`${apiUrl}/users/role/${username}`, fetcher);

  return {
    role: data,
    error,
  };
};

/**
 *
 * @param user - User Credentials
 *
 * {
 *    "email": "zura.kurta@gmail.com",
 *    "password:": "qawsedrf"
 * }
 */
export const login = async (user: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, user, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param googleResponse
 * @returns Authenticated user
 */

export const loginWithGoogle = async (googleResponse: GoogleLoginResponse) => {
  try {
    const response = await axios.post(
      `${apiUrl}/auth/google`,
      googleResponse,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * Logs out user
 */

export const logOut = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/logout`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const deactivateAccount = async () => {
  try {
    const response = await axios.delete(`${apiUrl}/users/`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const followUser = async (id: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/users/${id}/follow`,
      undefined,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param id
 * @returns User followers
 */

export const getUserFollowers = async (id: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/users/${id}/followers`,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param id
 * @returns User following users
 */

export const getUserFollowing = async (id: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/users/${id}/following`,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 * Upload Images
 */

export const uploadImage = async (image: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/images/upload`,
      image,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

// Community

/**
 *
 * @param { name: string, description: string }
 * @returns Created community
 */

export const createCommunity = async (data: {
  name: string;
  description: string;
  category: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @returns All communities
 */

export const getCommunities = () => {
  const { data, error } = useSWR(`${apiUrl}/community`, fetcher);

  return {
    communities: data,
    isLoading: !data && !error,
    error,
  };
};

export const updateCommunity = async (username: string, data: any) => {
  try {
    const response = await axios.put(
      `${apiUrl}/community/${username}`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const inviteModerator = async (username: string, id: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/invite-mod/`,
      {
        username,
        id,
      },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const acceptModerator = async (
  communityId: string,
  answer: boolean,
  userId?: string
) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/answer-mod/`,
      { communityId, answer, userId },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const newRule = async (username: string, data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/rules/${username}`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getRules = (username: string) => {
  const { data, error } = useSWR(`${apiUrl}/rules/${username}`, fetcher, {
    refreshInterval: 2000,
  });
  return {
    rules: data,
    isLoading: !data && !error,
    error: error,
  };
};

export const removeRule = async (username: string, rule: string) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/rules/${username}/${rule}`,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const updateRule = async (username: string, rule: string, data: any) => {
  try {
    const response = await axios.put(
      `${apiUrl}/rules/${username}/${rule}`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const reorderRules = async (username: string, reorderedRules: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/rules/${username}/reorderRules`,
      reorderedRules,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getFlairs = (username: string) => {
  const { data, error } = useSWR(
    `${apiUrl}/community/flairs/${username}`,
    fetcher
  );

  return {
    flairs: data,
    isLoading: !data && !error,
    error,
  };
};

export const newFlair = async (username: string, data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/new/flair/${username}`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const deleteFlair = async (username: string, id: string) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/community/flair/${username}/${id}`,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.respones;
  }
};

/**
 *
 * @param limit
 * @returns trending communities
 */

export const getTrendingCommunities = ({
  limit,
  category,
}: {
  limit?: number;
  category?: string;
}) => {
  const { data, error } = useSWR(
    `${apiUrl}/community/trending/${category ? category : ""}?limit=${limit}`, fetcher
  );

  return {
    communities: data,
    isLoading: !data && !error,
    error,
  };
};

/**
 *
 * @param name
 * @returns Community with given username
 */

export const getCommunity = (name: string) => {
  const { data, error } = useSWR(`${apiUrl}/community/${name}`, fetcher);

  return {
    community: data,
    isLoading: !data && !error,
    error,
  };
};

/**
 *
 * @param id
 * @returns
 */

export const joinCommunity = async (id: string, data?: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/${id}/join`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.reponse;
  }
};

export const leaveCommunity = async (id: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/${id}/leave`,
      null,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const responseOnJoinRequest = async (username: string, data: any) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/${username}/pending`,
      data,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.repsonse;
  }
};

export const getPendingMembers = (id: string) => {
  const { data, error } = useSWR(`${apiUrl}/community/${id}/pending`, fetcher);

  return {
    initialPendingMembers: data,
    isLoading: !data && !error,
    error,
  };
};

export function getRoleInCommunity(communityUsername: string) {
  const { data, error } = useSWR(
    `${apiUrl}/community/role/${communityUsername}`,
    fetcher
  );

  return {
    role: data,
    isLoading: !data && !error,
    error,
  };
}

export function getCommunityByLetter(letter: string) {
  const { data, error } = useSWR(
    `${apiUrl}/community/letter/${letter}`,
    fetcher
  );

  return {
    communities: data,
    isLoading: !data && !error,
    error,
  };
}

export async function banUser (data: any, communityId: string) {
  try {
    const response = await axios.post(`${apiUrl}/community/${communityId}/ban-user`, data, axiosOptions);
    return response;
  } catch(ex) {
    return ex.response;
  }
}

export async function removeBan (data: any, communityId: string) {
  try {
    const response = await axios.delete(`${apiUrl}/community/${communityId}/unban-user`, { ...axiosOptions, data })
    return response;
  } catch(ex) {
    return ex.response;
  }
}

export function getBannedUsers(communityId: string) {
  const { data, error } = useSWR(`${apiUrl}/community/${communityId}/banned`, fetcher);

  return {
    banned: data,
    isLoading: !data && !error,
    error
  }
}

// Categories

export function getCategories() {
  const { data, error } = useSWR(`${apiUrl}/category/`, fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    error,
  };
}

export function getCategory(value: string) {
  const { data, error } = useSWR(`${apiUrl}/category/${value}`, fetcher);

  return {
    category: data,
    isLoadingL: !error && !data,
    error,
  };
}

