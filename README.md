# AI Security Threat Detection System

A self-evolving security ecosystem where AI autonomously detects, explains, and responds to cyber threats faster than attackers can adapt.

## Product Vision

Create a self-evolving security ecosystem where AI autonomously detects, explains, and responds to cyber threats faster than attackers can adapt, fundamentally shifting the cybersecurity advantage to defenders.

## Target Audience

- Security Operations Centers (SOCs)
- Managed Security Service Providers (MSSPs)
- Mid-to-large enterprises with dedicated security teams
- Organizations in regulated industries requiring advanced threat detection and compliance

## Core Features

- **Threat Detection**: Real-time detection and logging of security threats
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for threat management
- **Threat Classification**: Automatic severity and status classification
- **API-First Design**: RESTful API for integration with existing security tools

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite (easily upgradeable to PostgreSQL)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Architecture**: Modular Monolith

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. Clone the repository or navigate to the project directory

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Edit `.env` file and update configuration as needed (especially SECRET_KEY for production)

## Running the Application

### Development Mode

Run the application with auto-reload:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at: `http://localhost:8000`

## API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Threats

- `POST /api/v1/threats/` - Create a new threat detection
- `GET /api/v1/threats/` - List all threats (with optional filtering)
- `GET /api/v1/threats/{threat_id}` - Get a specific threat
- `PUT /api/v1/threats/{threat_id}` - Update a threat
- `DELETE /api/v1/threats/{threat_id}` - Delete a threat

### Query Parameters for Listing

- `skip`: Number of records to skip (pagination)
- `limit`: Maximum number of records to return
- `severity`: Filter by severity (critical, high, medium, low, info)
- `status_filter`: Filter by status (detected, analyzing, mitigated, resolved, false_positive)

### Example Request

Create a new threat:

```bash
curl -X POST "http://localhost:8000/api/v1/threats/" \
  -H "Content-Type: application/json" \
  -d '{
    "threat_type": "SQL Injection",
    "severity": "high",
    "source_ip": "192.168.1.100",
    "destination_ip": "10.0.0.50",
    "description": "Detected SQL injection attempt in login form",
    "confidence_score": 0.95
  }'
```

## Project Structure

```
.
├── backend/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas for validation
│   └── routers/
│       ├── __init__.py
│       └── threats.py       # Threat management endpoints
├── .env.example             # Environment variables template
├── README.md                # This file
└── requirements.txt         # Python dependencies
```

## Architecture Overview

The application follows a **Modular Monolith** architecture with clear separation of concerns:

- **Routers**: Handle HTTP requests and responses
- **Models**: Define database schema using SQLAlchemy ORM
- **Schemas**: Validate input/output data using Pydantic
- **Database**: Manage database connections and sessions
- **Config**: Centralized configuration management

## Database Schema

### Threat Model

- `id`: Primary key
- `threat_type`: Type of threat detected
- `severity`: Threat severity level (critical, high, medium, low, info)
- `status`: Current status (detected, analyzing, mitigated, resolved, false_positive)
- `source_ip`: Source IP address
- `destination_ip`: Destination IP address
- `description`: Detailed threat description
- `ai_analysis`: AI-generated analysis (optional)
- `confidence_score`: Detection confidence (0.0 to 1.0)
- `detected_at`: Timestamp of detection
- `updated_at`: Last update timestamp
- `resolved_at`: Resolution timestamp
- `mitigation_action`: Actions taken to mitigate

## Environment Variables

See `.env.example` for all available configuration options:

- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: Secret key for security (change in production!)
- `ALLOWED_ORIGINS`: CORS allowed origins
- `DEBUG`: Enable debug mode (False in production)

## Security Considerations

- Change `SECRET_KEY` in production
- Use PostgreSQL or MySQL for production instead of SQLite
- Implement authentication and authorization
- Enable HTTPS in production
- Configure proper CORS origins
- Implement rate limiting
- Add input sanitization for all endpoints

## Future Enhancements

- AI-powered threat analysis
- Real-time threat monitoring dashboard
- Integration with SIEM systems
- Automated response mechanisms
- Machine learning model for threat prediction
- Multi-tenant support
- Advanced analytics and reporting

## License

Proprietary - All rights reserved

## Support

For issues and questions, please contact your security operations team.
