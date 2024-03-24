FROM nikolaik/python-nodejs:latest

# Set working directory to /app
WORKDIR /app

# Copy backend requirements file and install dependencies
COPY backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend dependencies and build the frontend
COPY frontend/package*.json /app/frontend/
WORKDIR /app/frontend
RUN npm install --unsafe-perm=true --force

# Copy the rest of the backend files
WORKDIR /app
COPY . .

# Expose the port where the frontend runs
EXPOSE 5173

# Command to run the Flask API and frontend
CMD ["sh", "-c", "python backend/obj_api.py & cd frontend && npm run dev"]
