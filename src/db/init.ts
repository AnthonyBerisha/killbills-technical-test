import Call from "./models/Call";
import Token from "./models/Token";

const dbInit = async (): Promise<void> => {
  await Token.sync();
  await Call.sync();
};

export default dbInit;
