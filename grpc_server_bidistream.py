import asyncio
import websockets
import json
import grpc
import echo_pb2
import echo_pb2_grpc

# This is only used if both client and server are streaming!!!
async def connect_ais_stream():
    channel = grpc.aio.insecure_channel('localhost:7151')
    stub = echo_pb2_grpc.AISServiceStub(channel)

    try:
        async with websockets.connect("wss://stream.aisstream.io/v0/stream") as websocket:
            subscribe_message = {
                "APIKey": "3a0365367f648ac250e0620a3ea9a81f7413da93",
                "BoundingBoxes": [[[-90, -180], [90, 180]]],
            }

            await websocket.send(json.dumps(subscribe_message))

            stream = stub.SendAisData()

            async for message_json in websocket:
                message = json.loads(message_json)
                message_type = message["MessageType"]

                if message_type == "PositionReport":
                    ais_message = message['Message']['PositionReport']

                    ais_data = echo_pb2.AISData(
                        id=ais_message['UserID'],
                        lat=ais_message['Latitude'],
                        long=ais_message['Longitude']
                    )

                    await stream.write(ais_data)
    
                    try:
                        response = await stream.read() 
                        print(f"Response received: {response}")
                    except grpc.aio.AioRpcError as e:
                        print(f"Error receiving response: {e.code()} - {e.details()}")

    except grpc.aio.AioRpcError as e:
        print(f"RPC error: {e.code()} - {e.details()}")
    except asyncio.CancelledError:
        print("Async task was cancelled")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        await channel.close()

if __name__ == "__main__":
    asyncio.run(connect_ais_stream())
