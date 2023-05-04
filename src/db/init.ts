import Token from "./models/Token";

const isDev = process.env.NODE_ENV === "development";

const dbInit = async (): Promise<void> => {
  await Token.sync({ alter: isDev });
};

export default dbInit;
