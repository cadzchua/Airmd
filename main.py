import asyncio
import websockets
import json
import grpc
import echo_pb2
import echo_pb2_grpc

async def connect_ais_stream():
    try:
        async with websockets.connect("wss://stream.aisstream.io/v0/stream") as websocket:
            subscribe_message = {"APIKey": "3a0365367f648ac250e0620a3ea9a81f7413da93",  # Required !
                                "BoundingBoxes": [[[-90, -180], [90, 180]]], # Required!
            }

            subscribe_message_json = json.dumps(subscribe_message)
            await websocket.send(subscribe_message_json)

            async for message_json in websocket:
                message = json.loads(message_json)
                message_type = message["MessageType"]

                if message_type == "PositionReport":
                    ais_message = message['Message']['PositionReport']
                    
                    # Create an AISMessage object
                    ais_data = echo_pb2.AISData()
                    ais_data.id = ais_message['UserID'] 
                    ais_data.lat = ais_message['Latitude'] 
                    ais_data.long = ais_message['Longitude'] 
                    
                    # Send AIS data via gRPC
                    channel = grpc.aio.insecure_channel('host.docker.internal:7151')
                    stub = echo_pb2_grpc.AISServiceStub(channel)
                    print(ais_data)
                    call = stub.SendAisData(ais_data)
                    print(call)
                    response = await call
                    # Handle response if needed
                    print(f"Response received: {response}")

    except grpc.aio.AioRpcError as e:
        print(f"RPC error: {e.code()} - {e.details()}")
    except asyncio.CancelledError:
        print("Async task was cancelled")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
                

if __name__ == "__main__":
    asyncio.run(connect_ais_stream())