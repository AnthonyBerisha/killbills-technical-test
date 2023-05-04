import Token from "./models/Token";

const dbInit = async (): Promise<void> => {
  await Token.sync();
};

export default dbInit;
