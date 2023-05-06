function getWords(text: string): string[] | null {
  if (text === null || text?.length === 0) {
    return null;
  }

  const matches = text.match(/(\w+)/g);

  return matches ?? null;
}

export { getWords };
