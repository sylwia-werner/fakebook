# fakebook

## Prerequisites

Make sure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup

### How to run project

```bash
git clone <repository_url>
cd fakebook
docker compose up --build

docker compose -f docker-compose.backend.yml up # to only run backend
docker compose -f docker-compose.frontend.yml up # to only run frontend
