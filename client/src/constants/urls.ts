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
    logoutAll: `${auth}/logoutAll`,
    forgotPassword: `${auth}/forgotPassword`,
    activatePassword: `${auth}/activatePassword`,
    changePassword: `${auth}/changePassword`,
  },
  users: {
    byId: (id: number): string => `${users}/${id}`,
  },
};

export { baseURL, urls };
