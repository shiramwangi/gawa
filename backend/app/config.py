from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    DEBUG: bool = True

    class Config:
        # Load .env from the backend directory regardless of CWD
        env_file = str((Path(__file__).resolve().parent.parent / ".env").resolve())
        env_file_encoding = "utf-8"

settings = Settings()
