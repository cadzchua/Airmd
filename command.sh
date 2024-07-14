# Used cmd to generate echo_pb2_grpc and echo_pb2
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. data.proto  
 
# Used ubuntu / bash(didn't try)
docker run -v ./echo.proto:/proto/echo.proto -it --rm fullstorydev/grpcurl -plaintext -proto proto/echo.proto -d '{"id":1, "lat": 79.898989, "long": 69.969696}' host.docker.internal:7151 aisstream.AISService.SendAisData

# Bidi stream
docker run -v ./echo.proto:/proto/echo.proto -it --rm fullstorydev/grpcurl -plaintext -proto proto/echo.proto -d @ host.docker.internal:7151 aisstream.AISService.SendAisData
# {"id":1, "lat": 79.898989, "long": 69.969696}

# syntax = "proto3";

# package aisstream;

# service AISService
# {
#   rpc SendAisData(AISData) returns (AISData);
# }

# message AISData
# {
#   uint32 id = 1;
#   double lat = 2;
#   double long = 3;
# }