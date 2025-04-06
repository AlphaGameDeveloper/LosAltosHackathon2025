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

with open("emails.json", "r") as f:
    emails = load(f)
# add an empty dict as the first element
emails.insert(0, {"num": len(emails)})
for email in emails:
    if "uuid" not in email:
        email["uuid"] = str(uuid4())
        
MODEL = "hermes3-8b"

PROMPT_WHY_IS_THIS_SPAM = """
DO NOT USE MARKDOWN - ONLY USE PLAIN TEXT
You are a spam detection model. You will be given an email and you will have to answer the question: "Why is this email spam?".
You will have to answer with a single line of text. The email is delimited by triple backticks.
You will have to answer the question: "Why is this email spam?". You will have to answer with a single line of text. The email is delimited by triple backticks.
don't add any extra text beyond what is strictly necessary to answer the question.
Examples:
    - Suspicious activity alert and urgent verification link from an unsolicited message is commonly a spam technique.
    - The email contains a suspicious link and asks for personal information.
    - The link in the email seems to be impersonating a legitimate service.
    - The email contains a suspicious link and asks for personal information.

```
{email}
```
The answer should be a single line of text. Do not add any other text.
"""

PROMPT_IS_THIS_SPAM = """
DO NOT USE MARKDOWN - ONLY USE PLAIN TEXT
You are a spam detection model. You will be given an email and you will have to answer the question: "Is this email spam?".
You will answer with "YES" or "NO", or "UNSURE". The email is delimited by triple backticks.
If the email is spam, you will answer "YES". If the email is not spam, you will answer "NO".  If there is not enough information to determine if the email is spam or not, you will answer "UNSURE".
Use all capitals.
You should check mainly for phishing and scam emails.
Examples:
    - YES
    - NO
    - UNSURE
```
{email}
```
"""

# Set up logging
logger_config = {
    "level": logging.DEBUG,
    "format": '%(levelname)s - %(message)s',
}
logging.basicConfig(**logger_config)
# app.logger.basicConfig(**logger_config)

def format_ai_response(response_text):
    """
    Format the AI response by removing unnecessary characters.
    """
    # Remove the <|end_of_text|> token and any trailing whitespace
    formatted_response = response_text.replace("<|end_of_text|>", "å").strip()
    final_response = ""
    for character in formatted_response:
        if character == "å":
            break
        final_response += character
    # Return the formatted response
    final_response = final_response.replace("*", "")
    final_response = final_response.replace("`", "")
    final_response = final_response.replace("\\", "")
    final_response = final_response.replace("\n", "")

    return final_response

@app.route("/")
@app.route("/api")
def index():
    return jsonify({"message": "All systems operational"}), 200

@app.route("/api/emails")
def get_emails():
    return jsonify(emails), 200

@app.route("/api/emails/<uuid>/why-is-it-spam", methods=["GET"])
def why_is_it_spam(uuid):
    # find the email with the given uuid
    email = next((email for email in emails if email["uuid"] == uuid), None)
    if not email:
        return jsonify({"error": "Email not found"}), 404
    # get the email content
    email_content = email["text"]
    # call the model
    response = lambdaai.completions.create(
        model=MODEL,
        prompt=PROMPT_WHY_IS_THIS_SPAM.format(email=email_content),
        temperature=0.0,
        max_tokens=100,
    )
    # get the answer
    choice = response.choices[0]
    final_answer = format_ai_response(choice.text)
    return jsonify({"answer": final_answer}), 200

@app.route("/api/emails/<uuid>/is-it-spam", methods=["GET"])
def is_it_spam(uuid):
    # find the email with the given uuid
    email = next((email for email in emails if email["uuid"] == uuid), None)
    if not email:
        return jsonify({"error": "Email not found"}), 404
    # get the email content
    email_content = email["text"]
    # call the model
    response = lambdaai.completions.create(
        model=MODEL,
        prompt=PROMPT_IS_THIS_SPAM.format(email=email_content),
        temperature=0.0,
        max_tokens=1,
    )
    # get the answer
    choice = response.choices[0]
    answer = format_ai_response(choice.text)
    app.logger.info(f"Answer: {answer}")
    if answer.strip().upper() == "YES":
        final_answer = 1
    elif answer.strip().upper() == "NO":
        final_answer = 2
    else:
        final_answer = 0 # unsure

    return jsonify({"answer": final_answer}), 200

@app.route("/api/send-email", methods=["POST"])
def send_email():
    content = request.json
    if not content:
        return jsonify({"error": "No content provided"}), 400
    
    required_fields = ()
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