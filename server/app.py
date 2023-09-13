import time
from flask import Flask, jsonify, request
from flask_cors import CORS

from mock_data import mock_data

app = Flask(__name__)
CORS(app)

@app.route('/search')
def search_handler():
    # simulate long request
    time.sleep(2)

    search_text = request.args.get('q')
    if not search_text:
        return jsonify(mock_data)
    filtered = [x for x in mock_data if search_text.upper() in x['type']]
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
