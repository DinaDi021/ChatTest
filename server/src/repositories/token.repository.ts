import { db } from "../configs/firebase";
import { IToken } from "../types/token.types";

export class TokenRepository {
  public async create(tokensPair: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }): Promise<void> {
    await db.collection("tokens").doc(tokensPair.accessToken).set({
      accessToken: tokensPair.accessToken,
      userId: tokensPair.userId,
    });

    await db.collection("tokens").doc(tokensPair.refreshToken).set({
      refreshToken: tokensPair.refreshToken,
      userId: tokensPair.userId,
    });
  }

  public async findOne(params: { token: string }): Promise<IToken> {
    const { token } = params;
    const tokenDoc = await db.collection("tokens").doc(token).get();
    return tokenDoc.data() as IToken;
  }

  public async deleteOne(params: { token: string }): Promise<void> {
    const { token } = params;
    await db.collection("tokens").doc(token).delete();
  }

  public async deleteManyByUserId(userId: string): Promise<void> {
    const querySnapshot = await db
      .collection("tokens")
      .where("userId", "==", userId)
      .get();
    querySnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });
  }
}

export const tokenRepository = new TokenRepository();
