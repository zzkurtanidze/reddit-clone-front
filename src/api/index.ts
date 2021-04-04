/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { GoogleLoginResponse } from "react-google-login";
import { UserType } from "../types";

const apiUrl = "http://localhost:4000/api";

const axiosOptions = {
  withCredentials: true,
};

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

export const getPosts = async () => {
  try {
    const data = await axios.get(`${apiUrl}/posts`, axiosOptions);
    return data;
  } catch (ex) {
    return;
  }
};

/**
 *
 * @param id
 * @returns Post with given id.
 */

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/posts/${id}`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
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

/**
 *
 * @param id - User id etc. 601ac04225644d90b1f23fbc
 *
 * Without params this function will return current user information
 *
 */
export const getUser = async (username = undefined) => {
  try {
    let response;
    if (!username) {
      response = await axios.get(`${apiUrl}/users/me`, axiosOptions);
    } else {
      response = await axios.get(`${apiUrl}/users/${username}`, axiosOptions);
    }
    return response.data;
  } catch (ex) {
    return undefined;
  }
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

export const getCommunities = async () => {
  try {
    const response = await axios.get(`${apiUrl}/community`);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param limit
 * @returns trending communities
 */

export const getTrendingCommunities = async (limit = 4) => {
  try {
    const response = await axios.get(
      `${apiUrl}/community/trending/?limit=${limit}`
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param name
 * @returns Community with given username
 */

export const getCommunity = async (name: string) => {
  try {
    const response = await axios.get(`${apiUrl}/community/${name}`);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

/**
 *
 * @param id
 * @returns
 */

export const joinCommunity = async (id: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/community/${id}/join`,
      null,
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.reponse;
  }
};

// Categories

export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/category/`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};
