from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_root_describes_the_api() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["name"] == "SyllabusFlow API"
    assert response.json()["docs"] == "/docs"


def test_health_endpoint_returns_ok() -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "SyllabusFlow API",
        "version": "0.1.0",
    }


def test_cors_allows_local_react_frontend() -> None:
    response = client.options(
        "/api/health",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
