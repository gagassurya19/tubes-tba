from flask import Flask, request, jsonify

app = Flask(__name__)

class FiniteAutomata:
    def __init__(self, valid_tokens):
        self.valid_tokens = valid_tokens

    def recognize(self, word):
        return word in self.valid_tokens

class PushdownAutomata:
    def __init__(self, s_recognizer, p_recognizer, o_recognizer, k_recognizer):
        self.s_recognizer = s_recognizer
        self.p_recognizer = p_recognizer
        self.o_recognizer = o_recognizer
        self.k_recognizer = k_recognizer

    def parse(self, tokens):
        state = 'S'
        structure = []

        print(tokens)

        for token in tokens:
            if state == 'S':
                if self.s_recognizer.recognize(token):
                    structure.append('S')
                    state = 'P'
                else:
                    return False, structure
            elif state == 'P':
                if self.p_recognizer.recognize(token):
                    structure.append('P')
                    state = 'O'
                else:
                    return False, structure
            elif state == 'O':
                if self.o_recognizer.recognize(token):
                    structure.append('O')
                    state = 'K'
                else:
                    if self.k_recognizer.recognize(token):
                        structure.append('K')
                        state = 'END'
                    else:
                        return False, structure
            elif state == 'K':
                if self.k_recognizer.recognize(token):
                    structure.append('K')
                    state = 'END'
                else:
                    return False, structure

        # Check if the structure matches any of the valid patterns
        valid_patterns = [['S', 'P', 'O', 'K'], ['S', 'P', 'K'], ['S', 'P', 'O'], ['S', 'P']]
        return structure in valid_patterns, structure

# Define valid tokens
subjek_tokens = ["saya", "kamu", "dia", "mereka", "kita", "aku"]
predikat_tokens = ["makan", "minum", "baca", "tulis", "lari"]
objek_tokens = ["nasi", "air", "buku", "surat", "sepeda"]
keterangan_tokens = ["dirumah", "disekolah", "dikantor", "dipasar", "ditaman"]

# Initialize finite automata
s_recognizer = FiniteAutomata(subjek_tokens)
p_recognizer = FiniteAutomata(predikat_tokens)
o_recognizer = FiniteAutomata(objek_tokens)
k_recognizer = FiniteAutomata(keterangan_tokens)

# Initialize pushdown automata
parser = PushdownAutomata(s_recognizer, p_recognizer, o_recognizer, k_recognizer)

@app.route('/parse', methods=['POST'])
def parse_sentence():
    data = request.get_json()
    sentence = data.get('sentence', '')
    tokens = sentence.split()
    data_parse = parser.parse(tokens)
    return jsonify({'sentence': sentence, 'isValid': data_parse[0], 'structure': data_parse[1]})

if __name__ == '__main__':
    app.run(debug=True)
