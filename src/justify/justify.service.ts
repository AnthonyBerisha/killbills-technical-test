import { create } from "~/db/dal/call";
import { countWords } from "~/utils/countWords";

const MAX_CHAR_LINE: number = 80;
export class JustifyService {
  async justify(token: string, text: string): Promise<string> {
    const wordCount: number = countWords(text);
    await this.createCall(token, wordCount);

    return text;
  }

  private async createCall(token: string, wordCount: number): Promise<void> {
    await create({ token, wordCount });
  }
}
