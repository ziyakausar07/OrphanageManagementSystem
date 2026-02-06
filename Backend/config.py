from dotenv import load_dotenv
import os
from urllib.parse import quote_plus

load_dotenv()

class Config:
    SECRET_KEY = "orphanage_secret"

    DB_USER = "root"
    DB_PASSWORD = quote_plus("$@ZIYAkausar07@$")
    DB_HOST = "127.0.0.1"
    DB_NAME = "orphanage_db"

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
    EMAIL_SMTP_SERVER = os.environ.get("EMAIL_SMTP_SERVER", "smtp.gmail.com")
    EMAIL_SMTP_PORT = int(os.environ.get("EMAIL_SMTP_PORT", 587))
