import crypto from "crypto";
import { UploadedFile } from "express-fileupload";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import * as path from "path";

import { storage } from "../configs/firebase";

export enum EFileTypes {
  User = "user",
  Message = "message",
}

class FirebaseStorageService {
  private storage;

  constructor(storageInstance: ReturnType<typeof getStorage>) {
    this.storage = storageInstance;
  }

  public async uploadFile(
    file: UploadedFile,
    itemType: EFileTypes,
    itemId: string,
  ): Promise<string> {
    const filePath = this.buildPath(file.name, itemType, itemId);
    const storageRef = ref(this.storage, filePath);

    await uploadBytes(storageRef, file.data, {
      contentType: file.mimetype,
    });
    return filePath;
  }

  public async getFileURL(filePath: string): Promise<string> {
    const storageRef = ref(this.storage, filePath);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  public async deleteFile(fileKey: string): Promise<void> {
    const storageRef = ref(this.storage, fileKey);
    await deleteObject(storageRef);
  }

  private buildPath(
    fileName: string,
    fileType: EFileTypes,
    fileId: string,
  ): string {
    return `${fileType}/${fileId}/${crypto.randomUUID()}${path.extname(
      fileName,
    )}`;
  }
}

export const firebaseStorageService = new FirebaseStorageService(storage);
