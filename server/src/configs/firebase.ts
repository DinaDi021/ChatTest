import * as admin from "firebase-admin";

import serviceAccount from "../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
// db.settings({ ignoreUndefinedProperties: true });
const auth = admin.auth();

export { admin, db, auth };
