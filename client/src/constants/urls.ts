const baseURL = process.env.REACT_APP_API;

const auth = "/auth";
const users = "/users";

const urls = {
  auth: {
    me: `${auth}/me`,
    register: `${auth}/register`,
    login: `${auth}/login`,
    refresh: `${auth}/refresh`,
    logout: `${auth}/logout`,
    logoutAll: `${auth}/logout-all`,
    forgotPassword: `${auth}/forgot`,
    setForgotPassword: (token: string): string => `${auth}/forgot/${token}`,
    changePassword: `${auth}/change`,
    activateAccount: `${auth}/activate`,
  },
  users: {
    byId: (id: string): string => `${users}/${id}`,
  },
};

export { baseURL, urls };
