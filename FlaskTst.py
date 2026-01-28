from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def get_data():
    return 'Hello world! from Flask'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)