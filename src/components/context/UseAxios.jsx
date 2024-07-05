import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

const baseURL = 'http://127.0.0.1:8000/form';

const UseAxios = () => {
  const { setUser, authTokens, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { "Authorization": `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user =jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: authTokens.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      console.log("Error refreshing token:", error);
      return Promise.reject(error);
    }
  });

  return axiosInstance;
};

export default UseAxios;
