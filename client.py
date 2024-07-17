import data_pb2_grpc
import data_pb2
import time
import grpc

def run():
    with grpc.insecure_channel('localhost:7151') as channel:
        stub = data_pb2_grpc.datatransferStub(channel)
        
        hello_request = data_pb2.DataRequest(reply = "Bonjour")
        hello_replies = stub.SendData(hello_request)

        for hello_reply in hello_replies:
            print("Server Response Received:")
            print(hello_reply)
       

if __name__ == "__main__":
    run()