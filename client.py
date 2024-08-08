import data_pb2_grpc
import data_pb2
import time
import grpc

def run():
    # with grpc.insecure_channel('localhost:6969') as channel:
    #     stub = data_pb2_grpc.datatransferStub(channel)
    #     print("debug1")
    #     hello_request = data_pb2.DataResponse(message = "Bonjour")
    #     print("debug2")
    #     hello_replies = stub.SendData(hello_request)
    #     print(f"Replies: {hello_replies}")
    #     # for hello_reply in hello_replies:
    #     #     print("Server Response Received:")
    #     #     print(hello_reply) 

    with grpc.insecure_channel('localhost:7151') as channel:
        stub = data_pb2_grpc.datatransferStub(channel)
        while True: 
        
            hello_request = data_pb2.DataResponse(message = "Bonjour")
            hello_replies = stub.SendData(hello_request)
            time.sleep(10)
        # print(f"Replies: {hello_replies}")
        # for hello_reply in hello_replies:
        #     print("Server Response Received:")
        #     print(hello_reply)
       

if __name__ == "__main__":
    run()