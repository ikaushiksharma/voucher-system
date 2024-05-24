# Voucher Service Backend System

This project is a voucher service backend system built using Node.js, Express.js, and PostgreSQL database. It provides functionality to generate, manage, and redeem vouchers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Model](#database-model)
- [API Diagram](#api-diagram)

## Installation

1. Clone the repository:

```
git clone https://github.com/ikaushiksharma/voucher-system.git
```

2. Navigate to the project directory:

```
cd voucher-system
```

## Usage

1. Start the PostgreSQL database using Docker Compose:

```
docker-compose up -d

```

2. Start the server:

```
bun install && bun dev
```

The server will be running at `http://localhost:3000`.

## Class Diagram

![Class Diagram](./assets/class-diagram.png)

## WorkFlow Diagram

![WorkFlow Diagram](./assets/workflow-diagram.png)
