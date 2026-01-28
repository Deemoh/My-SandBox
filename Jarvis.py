from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext 
from llama_index.readers.docling import DoclingReader
from llama_index.core import Settings, get_response_synthesizer
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.node_parser import MarkdownNodeParser #, MarkdownElementNodeParser, 
from flask import Flask, jsonify, render_template, request

reader = DoclingReader()

loader = SimpleDirectoryReader(input_dir="C:\Deepak\Deepak Mohan\AI", file_extractor={".xlsx":reader})


llm = Ollama(model="gemma3:4b", request_timeout=360.0)
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-large-en-v1.5", trust_remote_code=True)

Settings.embed_model = embed_model

Settings.llm = llm

#node_parser = MarkdownElementNodeParser()
node_parser = MarkdownNodeParser()

#print(loader.load_data())

index = VectorStoreIndex.from_documents(documents=loader.load_data(), transformations=[node_parser],show_progress=True)

# synth = get_response_synthesizer(
#     llm=llm,
#     embed_model=embed_model,
#     response_mode="tree_summarize",
#     streaming=True
# )

# query_engine = index.as_query_engine(streaming=True, similarity_top_k=1, 

app = Flask(__name__)
app.debug = True

@app.route('/api/llm', methods=['GET'])
def get_data():
    name = request.args.get('param1')

    query_engine = index.as_query_engine( similarity_top_k=1, 
                                          response_synthesizer=get_response_synthesizer(
                                              llm=llm,
                                            #   embed_model=embed_model,
                                              response_mode="tree_summarize",
                                              streaming=False
                                          ))

    if not name:
        return jsonify({'error': 'Missing param1'}), 400
    try:
        streaming_response = query_engine.query(name)
        response = jsonify({'Message': f'{streaming_response}'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)


# streaming_response = query_engine.query("What is the Material number of the delivery not completed records")

# streaming_response.print_response_stream()

#result = index.as_query_engine().query("What is the EKPO Extract")

#print(result)



