# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Blueprint, request, jsonify

google_bp = Blueprint('google', __name__)

@google_bp.route("/callback", methods=["GET"])
def google_callback():
    