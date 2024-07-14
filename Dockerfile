FROM python:3.9-slim
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    librdkafka-dev
WORKDIR /app
COPY main.py requirements.txt echo_pb2_grpc.py echo_pb2.py echo.proto /app/
RUN pip install -r requirements.txt 
CMD ["python", "main.py"]