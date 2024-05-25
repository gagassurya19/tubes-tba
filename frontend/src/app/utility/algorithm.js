import dataKata from '../json/data_kata.json';

class FiniteAutomata {
  constructor(validTokens) {
    this.validTokens = validTokens;
  }

  recognize(word) {
    return this.validTokens.includes(word);
  }
}

class PushdownAutomata {
  constructor(sRecognizer, pRecognizer, oRecognizer, kRecognizer, validPatterns) {
    this.sRecognizer = sRecognizer;
    this.pRecognizer = pRecognizer;
    this.oRecognizer = oRecognizer;
    this.kRecognizer = kRecognizer;
    this.validPatterns = validPatterns;
  }

  parse(tokens) {
    let state = 'S';
    const structure = [];

    for (const token of tokens) {
      if (state === 'S') {
        if (this.sRecognizer.recognize(token)) {
          structure.push('S');
          state = 'P';
        } else {
          return [false, structure];
        }
      } else if (state === 'P') {
        if (this.pRecognizer.recognize(token)) {
          structure.push('P');
          state = 'O';
        } else {
          return [false, structure];
        }
      } else if (state === 'O') {
        if (this.oRecognizer.recognize(token)) {
          structure.push('O');
          state = 'K';
        } else if (this.kRecognizer.recognize(token)) {
          structure.push('K');
          state = 'END';
        } else {
          return [false, structure];
        }
      } else if (state === 'K') {
        if (this.kRecognizer.recognize(token)) {
          structure.push('K');
          state = 'END';
        } else {
          return [false, structure];
        }
      }
    }

    return [this.validPatterns.some(pattern => JSON.stringify(pattern) === JSON.stringify(structure)), structure];
  }
}

const sRecognizer = new FiniteAutomata(dataKata.data.subjek);
const pRecognizer = new FiniteAutomata(dataKata.data.predikat);
const oRecognizer = new FiniteAutomata(dataKata.data.objek);
const kRecognizer = new FiniteAutomata(dataKata.data.keterangan);

export function parseSentence(sentence, validPatterns) {
  const parser = new PushdownAutomata(sRecognizer, pRecognizer, oRecognizer, kRecognizer, validPatterns);
  const tokens = sentence.split(' ');
  const [isValid, structure] = parser.parse(tokens);
  return { sentence, isValid, structure };
}
