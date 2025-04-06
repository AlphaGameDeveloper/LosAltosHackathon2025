# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from requests import get
from json import load

base_url = "http://localhost:5000/api/"

# get all emails
emails = get(f"{base_url}emails").json()["data"]

# get the first email classified as spam
spam_email = next(email for email in emails if email.get("classification") == "spam")
# get the uuid of the spam email
if not spam_email:
    print(spam_email)
    print("No spam email found")
    exit(1)
uuid = spam_email["uuid"]


r = get(f"{base_url}emails/{uuid}/why-is-it-spam")

try:
    print(r.json())
except Exception as e:
    print(f"Error: {e}")
    print(r.text)
