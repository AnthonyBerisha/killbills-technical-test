import Call, { type CallInput } from "../models/Call";
import moment from "moment";
import { Op } from "sequelize";

export const create = async (payload: CallInput): Promise<Call> => {
  const call = await Call.create(payload);
  return call;
};

export const sumWordCounts = async (token: string): Promise<number> => {
  const start = moment().startOf("day");
  const end = moment().endOf("day");

  const result = await Call.sum("wordCount", {
    where: {
      token,
      createdAt: {
        [Op.between]: [start.toDate(), end.toDate()],
      },
    },
  });

  return result ?? 0;
};
