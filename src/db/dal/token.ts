import { Op } from "sequelize";
import Token, { type TokenInput, type TokenOutput } from "../models/Token";

export const create = async (payload: TokenInput): Promise<Token> => {
  const token = await Token.create(payload);
  console.log(payload);
  return token;
};

export const get = async (
  key: string,
  value: string | number
): Promise<Token | null> => {
  return await Token.findOne({ where: { [key]: value } });
};
