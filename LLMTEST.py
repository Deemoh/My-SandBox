from flask import Flask, jsonify, render_template, request
from langchain_community.llms import ollama

app = Flask(__name__)

def test_ollama():
    llmresp = ollama.Ollama(model="llama3.2")

    response = llmresp.invoke("what is the capital of Saudi Arabia?")
    print(response)

if __name__ == '__main__':
    app.run(debug=True)


