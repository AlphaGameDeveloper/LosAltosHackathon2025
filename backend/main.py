# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Flask, request, jsonify, Response
from openai import OpenAI
from flask_cors import CORS
import os
import logging
from json import load
from time import sleep
from uuid import uuid4
# Initialize Flask app
app = Flask(__name__)
CORS(app)
# cors - allow all origins
lambdaai = OpenAI(
    api_key=os.environ.get("LAMBDAAI_SECRET"),
    base_url="https://api.lambda.ai/v1",
)
MODEL = "hermes-8b"

PROMPT_WHY_IS_THIS_SPAM = """
You are a spam detection model. You will be given an email and you will have to answer the question: "Why is this email spam?". You will have to answer with a single line of text. The email is delimited by triple backticks.
```
{email}
```
The answer should be a single line of text. Do not add any other text.
"""

# Set up logging
logger_config = {
    "level": logging.DEBUG,
    "format": '%(levelname)s - %(message)s',
}
logging.basicConfig(**logger_config)
# app.logger.basicConfig(**logger_config)

@app.route("/")
@app.route("/api")
def index():
    return jsonify({"message": "All systems operational"}), 200

@app.route("/api/emails")
def get_emails():
    sleep(1)
    with open("emails.json", "r") as f:
        emails = load(f)
    # add an empty dict as the first element
    emails.insert(0, {"num": len(emails)})
    for email in emails:
        if "uuid" not in email:
            email["uuid"] = str(uuid4())
        
    return jsonify(emails), 200
@app.after_request
def add_cors_headers(response: Response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')


    return jsonify({
        "data": response.get_json(),
        "status": response.status_code,
        "ok": response.status_code >= 200 and response.status_code < 300,
        "statusText": response.status
    })