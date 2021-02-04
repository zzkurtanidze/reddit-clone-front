/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { UserType } from "../types";

const apiUrl = "http://localhost:4000/api";

const axiosOptions = {
  withCredentials: true,
};

export const getPosts = async () => {
  try {
    const data = await axios.get(`${apiUrl}/posts`, axiosOptions);
    return data;
  } catch (ex) {
    return;
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
 * @param id - User id etc. 601ac04225644d90b1f23fbc
 *
 * Without params this function will return current user information
 *
 */
export const getUser = async (id = undefined) => {
  try {
    let response;
    if (!id) {
      response = await axios.get(`${apiUrl}/users/me`, axiosOptions);
    } else {
      response = await axios.get(`${apiUrl}/users/${id}`, axiosOptions);
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
