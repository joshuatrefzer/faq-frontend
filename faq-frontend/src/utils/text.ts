
const stopwords = new Set([
    "ich", "du", "er", "sie", "es", "wir", "ihr", "sie",
    "was", "wie", "warum", "wo", "wann", "ist", "sind", "hat", "haben",
    "ein", "eine", "der", "die", "das", "den", "dem", "mit", "von", "für", "auf", "an",
    "und", "oder", "nicht", "auch", "noch", "zu", "im", "ins", "am"
  ]);
  
  /**
   * Remove german stopwords from a given text.
   * @param input Input text
   * @returns cleaned text without stopwords
   */
  export function removeStopwords(input: string): string {
    return input
      .toLowerCase()
      .split(/\s+/)
      .filter(word => !stopwords.has(word))
      .join(" ");
  }
  