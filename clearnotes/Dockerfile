# --- Stage 1: Build the Frontend (Node) ---
FROM node:18-slim AS build-stage
WORKDIR /usr/src/app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

# --- Stage 2: Final Production Image (Python) ---
FROM python:3.10-slim
WORKDIR /usr/src/app

# Install dependencies for the backend
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY ./backend/ .

# Copy the built frontend from Stage 1 into a folder the backend can serve
# We place it in a folder named 'static_dist'
COPY --from=build-stage /usr/src/app/frontend/dist ./static_dist

# Port for the Python backend
EXPOSE 8000

# Set environment variable so Python knows it's in production
ENV PYTHONUNBUFFERED=1

CMD ["python3", "main.py"]