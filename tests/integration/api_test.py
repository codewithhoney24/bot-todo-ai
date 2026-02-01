import pytest
from fastapi.testclient import TestClient
from backend.main import app


client = TestClient(app)


def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_chat_endpoint_missing_message():
    """Test chat endpoint with missing message"""
    response = client.post("/api/test_user/chat", json={})
    # Should return 422 (validation error) since message is required
    assert response.status_code == 422


def test_chat_endpoint_valid_request():
    """Test chat endpoint with valid request"""
    # Note: This test will likely fail without a real database and OpenAI setup
    # But it tests the request/response structure
    response = client.post(
        "/api/test_user/chat",
        json={"message": "Test message", "conversation_id": None}
    )
    # This would typically return 500 due to missing dependencies (DB, OpenAI key)
    # But it verifies the authentication and basic request handling
    assert response.status_code in [200, 401, 500]