from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__)


@api_bp.route("/api/health")
def health():
    return jsonify({"status": "ok"})
