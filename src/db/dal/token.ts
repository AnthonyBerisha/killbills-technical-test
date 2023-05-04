import { Op } from "sequelize";
import Token, { type TokenInput, type TokenOutput } from "../models/Token";

export const create = async (payload: TokenInput): Promise<Token> => {
  console.table(payload);

  return await Token.create(payload);
};

// export const getBy = async (key: string, value: unknown): Promise<IngredientOuput> => {
//     const ingredient = await Token.findOne(id)
//     if (!ingredient) {
//         // @todo throw custom error
//         throw new Error('not found')
//     }
//     return ingredient
// }
