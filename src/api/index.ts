/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { UserType } from "../types";

const apiUrl = "http://localhost:4000/api";

const axiosOptions = {
  withCredentials: true,
};

export const newPost = async (post: {
  title: string;
  body: string;
  image: string;
  postedTo: { value: string; label: string };
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/posts`,
      {
        title: post.title,
        body: post.body,
        image: post.image,
        postedTo: post.postedTo.value,
      },
      axiosOptions
    );
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getPosts = async () => {
  try {
    const data = await axios.get(`${apiUrl}/posts`, axiosOptions);
    return data;
  } catch (ex) {
    return;
  }
};

export const getPostById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/posts/${id}`, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const likePost = async ({
  action,
  id,
}: {
  action: "like" | "unlike";
  id?: string;
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/posts/${id}/action`,
      {
        action: action,
      },
      axiosOptions
    );
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

export const logOut = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/logout`, axiosOptions);
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

/**
 *
 * * Community
 *
 */
// Get communities

export const getCommunities = async () => {
  try {
    const response = await axios.get(`${apiUrl}/community`);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getCommunity = async (name: string) => {
  try {
    const response = await axios.get(`${apiUrl}/community/${name}`);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

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
