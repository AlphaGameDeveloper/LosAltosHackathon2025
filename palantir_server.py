from flask import Flask, request, jsonify
from ctsd_sdk.types import ActionConfig, ActionMode, ValidationResult, ReturnEditsMode
from ctsd_sdk import FoundryClient
from foundry_sdk_runtime.auth import UserTokenAuth
import os

app = Flask(__name__)

auth = UserTokenAuth(
    hostname="https://losaltos.palantirfoundry.com",
    token=os.getenv("PALANTIR_USER_TOKEN"),
)

client = FoundryClient(auth=auth, hostname="https://losaltos.palantirfoundry.com")
ClassifiedEmailObject = client.ontology.objects.ClassifiedEmail

@app.route("/")
def classify_email():
    raw_email = request.args.get("text", "")
    if not raw_email:
        return jsonify({"error": "Missing 'text' parameter"}), 400

    response = client.ontology.actions.ctsd_action(
        action_config=ActionConfig(
            mode=ActionMode.VALIDATE_AND_EXECUTE,
            return_edits=ReturnEditsMode.ALL
        ),
        raw_email=raw_email
    )

    result = {
        "raw_email": raw_email,
        "validation": response.validation.validation_result.value,
        "edits": response.edits.to_dict() if response.edits and hasattr(response.edits, "to_dict") else None
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)