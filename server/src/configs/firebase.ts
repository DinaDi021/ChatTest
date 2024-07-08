import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

import serviceAccount from "../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
