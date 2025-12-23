import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chatify-doyw.onrender.com/api/v1"
      : "/",
  withCredentials: true,
});
