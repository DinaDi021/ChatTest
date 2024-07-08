import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5000,
  FRONT_URL: process.env.FRONT_URL,

};
