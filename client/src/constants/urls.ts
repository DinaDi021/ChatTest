const baseURL = process.env.REACT_APP_API;

const auth = "/auth";
const users = "/users";
const messages = "/messages";

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
    all: users,
    byId: (id: string): string => `${users}/${id}`,
    avatar: (id: string) => `${users}/${id}/avatar`,
  },
  messages: {
    byId: (receiverId: string): string => `${messages}/${receiverId}`,
    send: (receiverId: string): string => `${messages}/send/${receiverId}`,
  },
};

export { baseURL, urls };
