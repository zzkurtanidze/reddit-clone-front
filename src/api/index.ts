/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { UserType } from "../types";

const apiUrl = "http://localhost:4000/api";

export const getPosts = async () => {
  try {
    const data = await axios.get(`${apiUrl}/posts`);
    return data;
  } catch (ex) {
    return;
  }
};

export const register = async (user: UserType) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, user, {
      withCredentials: true,
    });
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      withCredentials: true,
    });
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const login = async (user: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, user, {
      withCredentials: true,
    });
    return response;
  } catch (ex) {
    return ex.response;
  }
};

export const logOut = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/logout`, {
      withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (ex) {
    return ex.response;
  }
};
