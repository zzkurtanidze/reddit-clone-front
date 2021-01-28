/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { UserType } from "../types";

const apiUrl = "http://localhost:4000/api";

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/posts`);
    console.log(data);
  } catch (ex) {
    console.log(ex);
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
