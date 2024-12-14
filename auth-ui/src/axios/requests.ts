import axios from "axios";

import { ILoginDetails } from "../pages/Auth/Login";
import { IRegistrationDetails } from "../pages/Auth/Registration";

const API_URL = process.env.REACT_APP_API_URL;

const AUTH_URL = `${API_URL}/auth`;
const PREVIEW_URL = `${API_URL}/linkpreview`;

export const requestLogin = (data: ILoginDetails) =>
  axios.post<{ accessToken: string }>(`${AUTH_URL}/login`, data);

export const requestRegister = (data: IRegistrationDetails) =>
  axios.post(`${AUTH_URL}/register`, data);

export const requestMetadata = (url: string) => {
  return axios.post(`${PREVIEW_URL}/${encodeURIComponent(url)}`);
};

export const requestRecords = () =>
  axios.post<{ data: any[] }>(`${PREVIEW_URL}/`);
