from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    database_url: Optional[str] = None
    openai_api_key: Optional[str] = None
    auth_secret: Optional[str] = None
    log_level: str = "INFO"

    class Config:
        env_file = ".env"


settings = Settings()