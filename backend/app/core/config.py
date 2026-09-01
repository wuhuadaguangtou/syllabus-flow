from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables and an optional .env file."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: str = "development"
    app_name: str = "SyllabusFlow API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api"
    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    database_url: str = (
        "postgresql+psycopg://syllabus_flow:syllabus_flow@localhost:5432/syllabus_flow"
    )
    upload_dir: Path = Path("data/uploads")


@lru_cache
def get_settings() -> Settings:
    return Settings()
