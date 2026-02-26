from flask import Flask
from flask_cors import CORS

from config import Config
from app.extensions import db, migrate


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    from app.routes import api_bp
    app.register_blueprint(api_bp)

    return app
