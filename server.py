from concurrent import futures
import time

import grpc
import data_pb2
import data_pb2_grpc

class datatransferServicer(data_pb2_grpc.datatransferServicer):
    
    def SendData(self, request, context):
        print("ParrotSaysHello Request Made:")
        print(request)

        for i in range(3):
            hello_reply = data_pb2.DataResponse()
            hello_reply.message = f"Hi this is server {i + 1}"
            yield hello_reply
            time.sleep(3)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    data_pb2_grpc.add_datatransferServicer_to_server(datatransferServicer(), server)
    server.add_insecure_port("localhost:8080")
    server.start()
    print("server Started~~")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()