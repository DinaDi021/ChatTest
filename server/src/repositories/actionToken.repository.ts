import { db } from "../configs/firebase";
import { EActionTokenType } from "../enums/actionTokenType";
import { IActionToken } from "../types/token.types";

export class ActionTokenRepository {
  public async create(dto: IActionToken): Promise<IActionToken> {
    await db.collection("actionTokens").doc(dto.token).set(dto);
    return dto;
  }

  public async findOne(params: { token: string }): Promise<IActionToken> {
    const { token } = params;
    const tokenDoc = await db.collection("actionTokens").doc(token).get();
    return tokenDoc.data() as IActionToken;
  }

  public async deleteOne(params: { token: string }): Promise<void> {
    const { token } = params;
    await db.collection("actionTokens").doc(token).delete();
  }

  public async deleteManyByUserIdAndType(
    userId: string,
    type: EActionTokenType,
  ): Promise<void> {
    const querySnapshot = await db
      .collection("actionTokens")
      .where("userId", "==", userId)
      .where("type", "==", type)
      .get();
    querySnapshot.forEach(async (doc) => {
      await doc.ref.delete();
    });
  }
}

export const actionTokenRepository = new ActionTokenRepository();
