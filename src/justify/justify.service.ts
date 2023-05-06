import { create } from "../db/dal/call";
import { getWords } from "../utils/getWords";

const MAX_CHAR_LINE: number = 80;
export class JustifyService {
  async justify(token: string, text: string): Promise<string> {
    const words = getWords(text);
    let wordCount: number = 0;

    if (words === null) {
      return "";
    }

    wordCount = words.length;

    await this.createCall(token, wordCount);

    const justifiedText: string[] = [];
    let currentLine: string = "";

    words.forEach((word) => {
      if (currentLine.length + word.length <= MAX_CHAR_LINE) {
        currentLine += word + " ";
      } else {
        justifiedText.push(currentLine.trim());
        currentLine = word + " ";
      }
    });

    if (currentLine.length > 0) {
      justifiedText.push(currentLine.trim());
    }

    for (let i = 0; i < justifiedText.length - 1; i++) {
      const line = justifiedText[i];
      const words = line.split(" ");
      const numSpacesNeeded = MAX_CHAR_LINE - line.replace(/ /g, "").length;
      const numSpacesPerGap = numSpacesNeeded / (words.length - 1);
      let remainderSpaces = numSpacesNeeded % (words.length - 1);
      let justifiedLine = "";

      for (let j = 0; j < words.length; j++) {
        justifiedLine += words[j];

        if (j < words.length - 1) {
          const numExtraSpaces = remainderSpaces > 0 ? 1 : 0;
          const numSpaces = numSpacesPerGap + numExtraSpaces;
          justifiedLine += " ".repeat(numSpaces);
          remainderSpaces--;
        }
      }

      justifiedText[i] = justifiedLine;
    }

    return justifiedText.join("\n");
  }

  private async createCall(token: string, wordCount: number): Promise<void> {
    await create({ token, wordCount });
  }
}
