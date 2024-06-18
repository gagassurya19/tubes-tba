from flask import Flask, request, send_file, jsonify
import graphviz
import os

app = Flask(__name__)

def generate_finite_automaton(nodes):
    # Define the finite automaton
    fa = graphviz.Digraph('finite_automaton', format='png')
    fa.attr(rankdir='LR')  # Set the orientation to left-to-right

    # S-P-O-K
    if nodes.get('o', '') != '' and nodes.get('k', '') != '':
        fa.node('q0', shape='circle', style='filled', fillcolor='yellow')
        fa.node('s', shape='circle', style='filled', fillcolor='yellow')
        fa.node('p', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('o', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('k', shape='doublecircle', style='filled', fillcolor='yellow')

        fa.edge('q0', 's', label=nodes['s'])
        fa.edge('s', 'p', label=nodes['p'])
        fa.edge('p', 'o', label=nodes['o'])
        fa.edge('o', 'k', label=nodes['k'])

    # S-P-O
    elif nodes.get('o', '') != '' and nodes.get('k', '') == '':
        fa.node('q0', shape='circle', style='filled', fillcolor='yellow')
        fa.node('s', shape='circle', style='filled', fillcolor='yellow')
        fa.node('p', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('o', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('k', shape='circle', style='filled', fillcolor='red', fontcolor='white')

        fa.edge('q0', 's', label=nodes['s'])
        fa.edge('s', 'p', label=nodes['p'])
        fa.edge('p', 'o', label=nodes['o'])
        fa.edge('o', 'k')

    # S-P-K
    elif nodes.get('o', '') == '' and nodes.get('k', '') != '':
        fa.node('q0', shape='circle', style='filled', fillcolor='yellow')
        fa.node('s', shape='circle', style='filled', fillcolor='yellow')
        fa.node('p', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('o', shape='circle', style='filled', fillcolor='red', fontcolor='white')
        fa.node('k', shape='doublecircle', style='filled', fillcolor='yellow')

        fa.edge('q0', 's', label=nodes['s'])
        fa.edge('s', 'p', label=nodes['p'])
        fa.edge('p', 'k', label=nodes['k'])

    # S-P
    else:
        fa.node('q0', shape='circle', style='filled', fillcolor='yellow')
        fa.node('s', shape='circle', style='filled', fillcolor='yellow')
        fa.node('p', shape='doublecircle', style='filled', fillcolor='yellow')
        fa.node('o', shape='circle', style='filled', fillcolor='red', fontcolor='white')
        fa.node('k', shape='circle', style='filled', fillcolor='red', fontcolor='white')

        fa.edge('q0', 's', label=nodes['s'])
        fa.edge('s', 'p', label=nodes['p'])

    # Save and render the automaton
    output_path = 'finite_automaton_custom'
    fa.render(output_path)

    # Return the image path
    return f'{output_path}.png'

@app.route('/generate-fa', methods=['POST'])
def generate_fa_endpoint():
    data = request.json
    sentence = data.get('sentence', '')
    structure = data.get('structure', [])
    
    if not sentence or not structure:
        return jsonify({'error': 'Invalid input'}), 400
    
    words = sentence.split()
    if len(words) != len(structure):
        return jsonify({'error': 'Sentence and structure length mismatch'}), 400
    
    # Convert structure elements to lowercase
    nodes = dict(zip([s.lower() for s in structure], words))
    if 's' not in nodes or 'p' not in nodes:
        return jsonify({'error': 'Structure must contain at least "s" and "p"'}), 400
    
    # Ensure keys for 'o' and 'k' exist in the nodes dictionary
    nodes.setdefault('o', '')
    nodes.setdefault('k', '')
    
    try:
        image_path = generate_finite_automaton(nodes)
        return send_file(image_path, mimetype='image/png')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
