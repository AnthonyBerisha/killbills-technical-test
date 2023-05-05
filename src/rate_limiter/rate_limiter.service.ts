import { sumWordCounts } from "../db/dal/call";

const DAILY_RATE_LIMIT = 80000;

export class RateLimiterService {
  public async check(token: string, text: string): Promise<boolean> {
    if (text?.length === 0) {
      return true;
    }

    console.log(text);

    const currentPayloadWordCount: number | undefined =
      text.match(/(\w+)/g)?.length;
    const sum: number = await sumWordCounts(token);
    let total: number = sum;

    if (
      currentPayloadWordCount !== 0 &&
      typeof currentPayloadWordCount !== "undefined"
    ) {
      total += currentPayloadWordCount;
    }

    if (total > DAILY_RATE_LIMIT) {
      return false;
    }

    return true;
  }
}
