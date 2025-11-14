
const stopwords = new Set([
    "ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "machen" , "mache", "sein", "habe",
    "was", "wie", "warum", "wo", "wann", "ist", "sind", "hat", "haben",
    "ein", "eine", "der", "die", "das", "den", "dem", "mit", "von", "für", "auf", "an",
    "und", "oder", "nicht", "auch", "noch", "zu", "im", "ins", "am", "als", "dass",
    "aber", "wenn", "so", "nur", "schon", "mehr", "sehr", "hier", "da", "dort",
    "alle", "jeder", "man", "mein", "dein", "sein", "ihr", "unser", "euer","meinem",
    "dies", "jenes", "welcher", "welche", "welches", "wer", "woher", "wohin",
    "über", "unter", "zwischen", "gegen", "durch", "ohne", "während", "trotz",
    "bis", "seit", "nach", "vor", "bei", "aus", "zu", "ab", "um", "entlang",
    "wenn", "weil", "ob", "dann", "doch", "also", "denn", "jedoch", "sondern",
    "sobald", "solange", "sowie", "indem", "damit", "obwohl", "falls", "dein", "sein", "ihr", "euer", "ihrer"
  ]);

  export function removeStopwords(input: string): string {
    return input
      .toLowerCase()
      .split(/\s+/)
      .filter(word => !stopwords.has(word))
      .join(" ");
  }
  