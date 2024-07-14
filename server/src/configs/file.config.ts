export const imageConfig = {
  MAX_SIZE: 2 * 1024 * 1024,
  MIMETYPES: ["image/png", "image/jpeg"],
};

export const documentConfig = {
  MAX_SIZE: 20 * 1024 * 1024,
  MIMETYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-rar-compressed",
  ],
};

export const mediaConfig = {
  MAX_SIZE: 200 * 1024 * 1024,
  MIMETYPES: [
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "video/mp4",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "video/x-matroska",
  ],
};

export const getConfigForMimeType = (mimetype: string) => {
  if (imageConfig.MIMETYPES.includes(mimetype)) {
    return imageConfig;
  } else if (documentConfig.MIMETYPES.includes(mimetype)) {
    return documentConfig;
  } else if (mediaConfig.MIMETYPES.includes(mimetype)) {
    return mediaConfig;
  } else {
    return null;
  }
};
