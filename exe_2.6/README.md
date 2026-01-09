# Docker Networking and Service Communication Guide

This guide explains how the services in this Docker Compose application communicate with each other, how they are specified in the Docker Compose file, and key Docker networking concepts. It's written for beginners, so we'll break it down step by step.

## Overview of the Application

This application consists of several services:
- **Frontend**: A React web application
- **Backend**: A Go API server
- **Database**: PostgreSQL database
- **Redis**: In-memory data store
- **Proxy**: Nginx reverse proxy

## How Services Communicate

In Docker Compose, services run in isolated containers but can communicate with each other through a shared network. By default, Docker Compose creates a bridge network for all services in the same `docker-compose.yaml` file.

### Service Discovery
Services can reach each other using their service names as hostnames. For example:
- The backend service can connect to Redis using `redis` as the hostname
- The backend can connect to PostgreSQL using `database` as the hostname

### Communication Flow

```mermaid
graph TD
    A[User] --> B[Proxy (Nginx)]
    B --> C[Frontend (React)]
    B --> D[Backend (Go)]
    D --> E[Database (PostgreSQL)]
    D --> F[Redis]
    
    C -.->|API calls via /api/| B
    D -.->|Data storage| E
    D -.->|Caching| F
```

1. **User Access**: Users access the application through port 80 on the host, which is mapped to the Nginx proxy.
2. **Proxy Routing**: Nginx routes requests:
   - `/` requests go to the Frontend service on port 5000
   - `/api/` requests go to the Backend service on port 8080
3. **Backend Operations**: The Backend service:
   - Stores and retrieves data from the PostgreSQL database
   - Uses Redis for caching
4. **Frontend-Backend Communication**: The Frontend makes API calls to the Backend through the proxy

## How Services Are Specified in docker-compose.yaml

Each service is defined in the `services` section of the `docker-compose.yaml` file:

### Service Definition Structure
```yaml
services:
  service_name:
    image: image_name  # or build: context
    ports:
      - "host_port:container_port"
    environment:
      - KEY=value
    volumes:
      - host_path:container_path
    depends_on:
      - other_service
    restart: policy
```

### Environment Variables for Configuration
Services use environment variables to configure connections:
- `REDIS_HOST=redis` tells the backend to connect to the Redis service
- `POSTGRES_HOST=database` tells the backend to connect to PostgreSQL
- `REACT_APP_BACKEND_URL` configures the frontend's API endpoint

### Ports
- **Published Ports**: `ports` mapping exposes container ports to the host
- **Internal Ports**: Services communicate internally without exposing all ports

### Dependencies
`depends_on` ensures services start in the correct order (though it doesn't wait for services to be ready).

## Key Docker Networking Concepts

### 1. Bridge Network (Default)
- Docker Compose automatically creates a bridge network
- Containers on the same network can communicate using service names
- Isolated from other networks for security

### 2. Service Names as DNS
- Each service gets a DNS entry matching its name
- No need to know IP addresses - just use the service name

### 3. Port Mapping
- `ports: ["80:80"]` maps host port 80 to container port 80
- Allows external access to services

### 4. Internal Networking
- Services communicate internally without exposing ports externally
- More secure and efficient

### 5. Volumes for Persistence
- `volumes` mount host directories into containers
- Data persists even if containers are recreated
- Used for database storage in this app

### 6. Restart Policies
- `restart: unless-stopped` ensures services restart automatically
- Improves reliability in production

## Running the Application

To start all services:
```bash
docker compose up -d --build
```

To stop:
```bash
docker compose down
```

The application will be available at `http://localhost` (port 80).

## Troubleshooting

- Check service logs: `docker compose logs service_name`
- Verify network: `docker network ls` and `docker network inspect network_name`
- Test connectivity: `docker compose exec service_name ping other_service`

This setup demonstrates a typical microservices architecture with proper service isolation and communication patterns.