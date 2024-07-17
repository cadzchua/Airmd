# gRPC-Kafka Proxy

## Introduction

This project sets up a gRPC-Kafka proxy (**Zilla**) where the client listens on HTTPS port `7151` and uses Kafka to communicate with a server on TCP port `8080`. This allows for efficient message streaming using gRPC and handling using Zilla as a middle layer.

## Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- Python 3.7+
- bash, jq, nc
- Kubernetes (e.g. Docker Desktop with Kubernetes enabled)
- kubectl
- helm 3.0+

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/cadzchua/Airmd.git
    cd Airmd
    ```

2. Build and run the Docker images:
    ```sh
    # -d: detach so you can still use your terminal
    docker-compose up [-d]
    ```

3. Start the server then the client:
    ```sh
    python server.py
    ```
    ```sh
    python client.py
    ```

## Configuration

The proxy service is defined in the `zilla.yml` file and the gRPC service is defined in the `proto` files. Below is the main configuration for the gRPC-Kafka proxy:

### Files
- data.proto - edit the file to edit information that the server/client is sending across the gRPC


## Debugging
If you ever need to **debug**, first check that the gRPC server and client can connect to each other by changing the port in the `server.py` and `client.py` code to a `same port (e.g. 50051)` and run both `server.py` and `client.py`.

```bash 
python server.py

python client.py

# It should be sending messages across!
# Only continue if this step succeeds.
```

Then, revert back the port numbers in `server.py` and `client.py` to their original values.

Install Kadeck (or other monitoring tool) and connect to `kafka (localhost:9092)` monitor the topics and consumer to validate that the proxy is working. If the proxy failed to work as intended, the file to edit would be the `zilla.yml` file.

Tip: Also check the Dockerfile to make sure you are exposing the port that you are using.