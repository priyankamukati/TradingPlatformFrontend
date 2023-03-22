import { Auth, Hub } from "aws-amplify";

const axios = require("axios");

const api = axios.create({});

api.interceptors.request.use(
  async (config: any) => {
    try {
      const response = await Auth.currentSession();
      let accessToken = response.getAccessToken();
      const access_token = accessToken.getJwtToken();
      if (access_token) {
        config.headers["Authorization"] = "Bearer " + access_token;
      }
    } catch (err) {
      console.log("are you signed in? " + err);
      Auth.federatedSignIn();
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
