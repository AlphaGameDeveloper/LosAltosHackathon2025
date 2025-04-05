# Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

from flask import Flask

app = Flask(__name__)

@app.route('/hworld')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
