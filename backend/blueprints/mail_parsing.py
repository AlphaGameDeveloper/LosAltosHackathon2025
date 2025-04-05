# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import re
mail_parsing_bp = Blueprint('mail_parsing', __name__)

def extract_email_data(email_text):
    """
    Extract data from an email text with no newlines.
    
    Args:
        email_text (str): Email text as a single line
        
    Returns:
        dict: Dictionary with headers and body
    """
    email_data = {
        'headers': {},
        'body': ''
    }
    
    # Use regex to find headers in the format "Header-Name: Value"
    header_pattern = r'([A-Za-z0-9_-]+(?:-[A-Za-z0-9_-]+)*): ([^:]+?)(?= [A-Za-z0-9_-]+(?:-[A-Za-z0-9_-]+)*: |$)'
    
    # Find all headers
    for match in re.finditer(header_pattern, email_text):
        name = match.group(1)
        value = match.group(2).strip()
        email_data['headers'][name] = value
    
    # Extract body (everything after the last header)
    last_match = None
    for match in re.finditer(header_pattern, email_text):
        last_match = match
    
    if last_match:
        body_start = last_match.end()
        if body_start < len(email_text):
            email_data['body'] = email_text[body_start:].strip()
    
    return email_data

@mail_parsing_bp.route('/parse') #, methods=['POST'])
@cross_origin()
def parse_email():
    args = request.args
    text = args.get('content')
    if not text:
        return jsonify({'error': 'No text provided', "solution": "Add the ?content= parameter"}), 400
    # extract all headers from the email
    return extract_email_data(text)