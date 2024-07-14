import asyncio
import grpc
import echo_pb2
import echo_pb2_grpc

async def connect_ais_stream():
    async with grpc.aio.insecure_channel('localhost:7151') as channel:
        stub = echo_pb2_grpc.AISServiceStub(channel)
        
        async def generate_messages():
            for i in range(5):  # Sending 5 messages
                ais_data = echo_pb2.AISData(
                    id=i,
                    lat=1.23456 + i,
                    long=2.34567 + i
                )
                yield ais_data
        
        # Send the stream of messages and receive the response
        response = await stub.SendAisData(generate_messages())
        print(f"Response received: {response.reply}")

if __name__ == "__main__":
    asyncio.run(connect_ais_stream())
