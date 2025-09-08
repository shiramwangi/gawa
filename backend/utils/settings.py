from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)

    # Security
    SECRET_KEY: str = "change-me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "sqlite:///../gawa.db"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]


settings = Settings()  # Singleton-style import


