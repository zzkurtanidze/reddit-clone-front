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

export const register = async (user: UserType) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, user, axiosOptions);
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/me`, axiosOptions);
    return response.data;
  } catch (ex) {
    return undefined;
  }
};

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
    console.log(response);
    return response;
  } catch (ex) {
    return ex.response;
  }
};
