# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Flask, Response, jsonify
from blueprints.mail_parsing import mail_parsing_bp
app = Flask(__name__)

app.register_blueprint(mail_parsing_bp, url_prefix='/api/mail_parsing')
@app.route('/api')
@app.route("/")
def hello_world():
    return {
        "message": "Hello, World!",
    }

@app.route('/api/health')
def health():
    # TODO: Add health check logic
    return {
        "message": "API is healthy!",
    }
@app.after_request
def json_struct(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    response_json = response.get_json()

    return jsonify({
        "data": response_json,
        "status": response.status_code,
        "success": (response.status_code > 199 and response.status_code < 300) # 2xx
    })
if __name__ == '__main__':
    app.run(debug=True)
