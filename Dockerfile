FROM python:3.9-slim
WORKDIR /app
COPY main.py requirements.txt echo_pb2_grpc.py echo_pb2.py echo.proto /app/
RUN pip install -r requirements.txt 
CMD ["python", "main.py"]