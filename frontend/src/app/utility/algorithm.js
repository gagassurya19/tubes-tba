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
    this.logs = [];
  }

  logState(stack, token, state, isTerminal) {
    this.logs.push(`Top = ${isTerminal ? state : token}`);
    this.logs.push(`Symbol = ${token}`);
    this.logs.push(`${isTerminal ? state : token} adalah simbol ${isTerminal ? 'non-terminal' : 'terminal'}`);
    this.logs.push(`Isi stack = [${stack.join(', ')}]`);
  }

  parse(tokens) {
    let state = 'S';
    const structure = [];
    let state_now = 'SUB';
    const stack = ['#', 'SUB', 'PRD', 'OBJ', 'KET'];

    try {

      for (const token of tokens) {
        // log pertama kali jalankan hanya satu kali
        if (tokens.indexOf(token) === 0) {
          this.logs.push(`Top = ${state}`);
          this.logs.push(`Symbol = ${token}`);
          this.logs.push(`${state} adalah simbol non-terminal`);
          this.logs.push(`Isi stack = [${stack.join(', ')}]`);
        } else {
          this.logState(stack, token, state_now, false);
        }

        if (state === 'S') {
          if (this.sRecognizer.recognize(token)) {
            state_now = 'SUB';
            structure.push('S');
            state = 'P';
            stack[1] = token;
          } else {
            return [false, structure, this.logs];
          }
        } else if (state === 'P') {
          if (this.pRecognizer.recognize(token)) {
            state_now = 'PRD';
            structure.push('P');
            state = 'O';
            stack[1] = token;
          } else {
            return [false, structure, this.logs];
          }
        } else if (state === 'O') {
          if (this.oRecognizer.recognize(token)) {
            state_now = 'OBJ';
            structure.push('O');
            state = 'K';
            stack[1] = token;
          } else if (this.kRecognizer.recognize(token)) {
            state_now = 'KET';
            structure.push('K');
            state = 'END';
            stack[1] = token;
          } else {
            return [false, structure, this.logs];
          }
        } else if (state === 'K') {
          if (this.kRecognizer.recognize(token)) {
            state_now = 'KET';
            structure.push('K');
            state = 'END';
            stack[1] = token;
          } else {
            return [false, structure, this.logs];
          }
        }

        this.logState(stack, token, state_now, true);

        // log terkahir jalankan hanya satu kali
        if (tokens.indexOf(token) === tokens.length - 1) {
          this.logs.push(`Top = ${token}`);
          this.logs.push(`Symbol = ${token}`);
          this.logs.push(`${token} adalah simbol terminal`);
          this.logs.push(`Isi stack = [#]`);
        }

        // Hapus simbol terminal dari stack
        stack.splice(stack.indexOf(token), 1);
      }
      
      this.logs.push(`Isi stack = []`);
      this.logs.push(`Input string "${tokens.join(' ')}" diterima, sesuai Grammar`);
  
    } catch (error) {
      this.logs = []
      this.logs.push(`error: ${error}`);
    }
    
    const isValid = this.validPatterns.some(pattern => JSON.stringify(pattern) === JSON.stringify(structure));
    return [isValid, structure, this.logs];
  }
}

const sRecognizer = new FiniteAutomata(dataKata.data.subjek);
const pRecognizer = new FiniteAutomata(dataKata.data.predikat);
const oRecognizer = new FiniteAutomata(dataKata.data.objek);
const kRecognizer = new FiniteAutomata(dataKata.data.keterangan);

export function parseSentence(sentence, validPatterns) {
  const parser = new PushdownAutomata(sRecognizer, pRecognizer, oRecognizer, kRecognizer, validPatterns);
  const tokens = sentence.split(' ');
  const [isValid, structure, logs] = parser.parse(tokens);
  if(!isValid) {
    logs.splice(0, logs.length);
    logs.push(`Input string "${tokens.join(' ')}" tidak diterima, tidak sesuai Grammar`);
  }
  return { sentence, isValid, structure, logs };
}
