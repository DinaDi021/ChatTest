import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import * as admin from "firebase-admin";

import serviceAccount from "../serviceAccount.json";
import { configs } from "./configs";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const app = initializeApp(configs.firebaseConfig);
const storage = getStorage(app);

const db = admin.firestore();

const auth = admin.auth();

export { admin, db, auth, storage };
