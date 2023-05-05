import Token, { type TokenInput } from "../models/Token";

export const create = async (payload: TokenInput): Promise<Token> => {
  const token = await Token.create(payload);
  return token;
};

export const get = async (
  key: string,
  value: string | number
): Promise<Token | null> => {
  return await Token.findOne({ where: { [key]: value } });
};
