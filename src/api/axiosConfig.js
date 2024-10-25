import axios from "axios";

const env = process.env.REACT_APP_ENV || "dev";

const getBaseUrl = (onlyBasePrefix) => {
  if (env === "local") {
    if (onlyBasePrefix)
      return `http://localhost:8082/`;
    else
      return `http://localhost:8082/api/practice/v1/`;
  } else {
    if (onlyBasePrefix)
      return `https://api-dev.kinesin.health/`;
    else
      return `https://api-dev.kinesin.health/api/practice/v1/`;
  }
};

export const createAxiosInstance = (onlyBasePrefix) => {
  const axiosInstance = axios.create({
    baseURL: getBaseUrl(onlyBasePrefix),
    headers: {
      Accept: "*",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error && error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log("Access token expired. Refreshing...");
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          console.log("New access token:", newAccessToken); // Log the new token
          sessionStorage.setItem("accessToken", newAccessToken);
          // Create a new Axios instance with updated headers
          const newAxiosInstance = axios.create({
            baseURL: getBaseUrl(),
            headers: {
              Accept: "*",
              Authorization: `Bearer ${newAccessToken}`, // Use the new access token
            },
          });
          // Make the original request with the new Axios instance
          return newAxiosInstance(originalRequest);
        } else {
          console.log("Token refresh failed. Logging out or redirecting...");
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    return null;
  }

  try {
    console.log("Refreshing access token...");
    const response = await axios.post(
      // Replace with the URL of refresh token endpoint on the server
      "http://devapi.kinesin.health/api/auth/v1/refresh-token",
      {
        refreshToken,
      },
      {
        headers: {
          Accept: "*",
        },
      }
    );

    // Assuming the server responds with a new access token
    const newAccessToken = response.data.accessToken;
    console.log("Refreshed access token:", newAccessToken); // Log the new token
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}
