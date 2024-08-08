from concurrent import futures
import time

import grpc
import data_pb2
import data_pb2_grpc

class datatransferServicer(data_pb2_grpc.datatransferServicer):
    
    def SendData(self, request, context):
        print("Client Request Made:")
        print(request)

        def client_disconnected():
            print("\nClient disconnected. Server listening at port 8080.")

        context.add_callback(client_disconnected)

        while context.is_active():
            try:
                hello_reply = data_pb2.DataResponse()
                message = input("Enter your message: ")
                hello_reply.message = message
                yield hello_reply
            except grpc.RpcError as e:
                print(f"Client disconnected with error: {e}")
                break
            

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    data_pb2_grpc.add_datatransferServicer_to_server(datatransferServicer(), server)
    server.add_insecure_port("localhost:6969")
    server.start()
    print("server Started~~ Listening at port 7151.")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()