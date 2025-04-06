# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Blueprint, request, jsonify
from flask_cors import cross_origin

llm_bp = Blueprint('llm', __name__)

@llm_bp.route('/llm-response', methods=['POST'])
@cross_origin()
def llm_response():
     #using palantir API

    # Get the request data
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    
    