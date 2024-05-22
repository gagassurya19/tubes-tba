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

        for token in tokens:
            if state == 'S':
                if self.s_recognizer.recognize(token):
                    state = 'P'
                    structure.append('S')
                else:
                    return False
            elif state == 'P':
                if self.p_recognizer.recognize(token):
                    state = 'O'
                    structure.append('P')
                else:
                    return False
            elif state == 'O':
                if self.o_recognizer.recognize(token):
                    state = 'K'
                    structure.append('O')
                else:
                    state = 'END'
            elif state == 'K':
                if self.k_recognizer.recognize(token):
                    state = 'END'
                    structure.append('K')
                else:
                    state = 'END'

        # Check if the structure matches any of the valid patterns
        valid_patterns = [['S', 'P', 'O', 'K'], ['S', 'P', 'K'], ['S', 'P', 'O'], ['S', 'P']]
        return structure in valid_patterns

# Define valid tokens
subjek_tokens = ["saya", "kamu", "dia", "mereka", "kita"]
predikat_tokens = ["makan", "minum", "baca", "tulis", "lari"]
objek_tokens = ["nasi", "air", "buku", "surat", "sepeda"]
keterangan_tokens = ["di rumah", "di sekolah", "di kantor", "di pasar", "di taman"]

# Initialize finite automata
s_recognizer = FiniteAutomata(subjek_tokens)
p_recognizer = FiniteAutomata(predikat_tokens)
o_recognizer = FiniteAutomata(objek_tokens)
k_recognizer = FiniteAutomata(keterangan_tokens)

# Initialize pushdown automata
parser = PushdownAutomata(s_recognizer, p_recognizer, o_recognizer, k_recognizer)

# Test cases
sentences = [
    "saya makan nasi di rumah",
    "kamu minum air",
    "dia baca buku di sekolah",
    "mereka tulis surat",
    "kita lari di taman",
    "kita lari",
    "kita di taman",
]

for sentence in sentences:
    tokens = sentence.split()
    is_valid = parser.parse(tokens)
    print(f"'{sentence}' is {'valid' if is_valid else 'invalid'}")
