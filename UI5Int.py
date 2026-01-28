import os
from flask import Flask, jsonify, render_template, request
from langchain_community.llms import ollama
# from langchain_community.memory import ConversationBufferMemory as ConversationMemory


ollama_model = ollama.Ollama(model="gemma3:12b")
# ollama_model = ollama.Ollama(model="llama3.2:latest")

app = Flask(__name__)

# memory = ConversationMemory()

@app.route('/api/llm', methods=['GET'])
def get_data():
        
    name = request.args.get('param1')
    # user_input = input(f"You: {name}")
    # memory.add_user_input(user_input)
    # context = memory.get_context()
    if not name:
        return jsonify({'error': 'Missing param1'}), 400
    try:
        llmresp = ollama_model.invoke(name)
        response = jsonify({'Message': f'{llmresp}'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)