import grpc
from concurrent import futures
import echo_pb2
import echo_pb2_grpc

class AISService(echo_pb2_grpc.AISServiceServicer):
    async def SendAisData(self, request_iterator, context):
        async for ais_data in request_iterator:
            print(f"Received AISData: ID={ais_data.id}, Lat={ais_data.lat}, Long={ais_data.long}")
        
        return echo_pb2.AISResponse(reply="Data received successfully!")

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = echo_pb2_grpc.AISServiceStub
    echo_pb2_grpc.add_AISServiceServicer_to_server(AISService(), server)
    server.add_insecure_port('[::]:7151')
    
    print("Starting gRPC server on port 7151...")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
