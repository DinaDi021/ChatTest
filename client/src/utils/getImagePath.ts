import {
  FIREBASE_STORAGE_BASE_URL,
  FIREBASE_STORAGE_BUCKET,
} from "../constants/firebase";

export const getAvatarUrl = (path: string) => {
  return `${FIREBASE_STORAGE_BASE_URL}${FIREBASE_STORAGE_BUCKET}${encodeURIComponent(path)}?alt=media`;
};
