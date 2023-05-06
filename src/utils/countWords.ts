function countWords(text: string): number {
  if (text === null || text?.length === 0) {
    return 0;
  }

  const matches = text.match(/(\w+)/g);

  return matches !== null ? matches.length : 0;
}

export { countWords };
