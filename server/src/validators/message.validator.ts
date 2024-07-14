import joi from "joi";

export class MessageValidator {
  static messageText = joi
    .string()
    .min(0)
    .max(300)
    .error(new Error("Message must be shorter"));

  static create = joi.object({
    messageText: this.messageText,
  });
}
