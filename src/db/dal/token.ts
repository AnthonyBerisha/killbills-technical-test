import { Op } from "sequelize";
import Token, { type TokenInput, type TokenOutput } from "../models/Token";

export const create = async (payload: TokenInput): Promise<Token> => {
  return await Token.create(payload);
};

export const get = async (
  key: string,
  value: string | number
): Promise<Token> => {
  const token: Token | null = await Token.findOne({ where: { [key]: value } });
  if (token == null) {
    throw new Error("not found");
  }
  return token;
};
