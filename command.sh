# Used cmd to generate data_pb2_grpc and dataecho_pb2
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. data.proto  