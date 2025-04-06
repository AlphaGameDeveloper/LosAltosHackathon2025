from flask import Flask, request, jsonify
from ctsd_sdk.types import ActionConfig, ActionMode, ValidationResult, ReturnEditsMode
from ctsd_sdk import FoundryClient
from foundry_sdk_runtime.auth import UserTokenAuth

app = Flask(__name__)

auth = UserTokenAuth(
    hostname="https://losaltos.palantirfoundry.com",
    token="eyJwbG50ciI6ImFaalR4SFVGTWdPUExtWEpyUThwWVE9PSIsImFsZyI6IkVTMjU2In0.eyJleHAiOjE3NDM5NDgyOTgsInNpZCI6Ik1NZGFnTWpOU0dxVlhwMUNndm1MU1E9PSIsInN1YiI6Im5zbjFLbTdpUlNtRWJkQVNWNkZRZ3c9PSIsIm9yZyI6Ikh5MnFYdGNFU2ZPVzg1d3dWMkVpSXc9PSJ9.OG8YDpY3dzJFFRJwiu5_Nya25VU0vnfsXwQYieHomncltYUm7hDrna9BRDLZVNRoRhF8ZVKAceHVvyUQnTODwQ"
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