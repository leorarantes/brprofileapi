# BRUserAPI <img src="./assets/flag.svg" style="height:31px">


Backend for BRUserAPI, an API that registers and returns Brazilian users.

## 📋 About

BRUserAPI is an API that registers and returns Brazilian users by allowing clients to send requests to create new users records, which are then stored in a database. The API also provides an endpoint for retrieving existing user records, so that clients can retrieve information about previously registered users.

## 💻 Technologies and Concepts

- REST APIs
- Object-oriented programming
- Node.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Integration Testing
- Jest
- Thunder Client
- Docker
- GitHub Actions

## 🏁 Building and running it locally:

### Without Docker:

1. Initiate a PostgreSQL server.
2. Clone this repository.
3. Install all dependencies.

```bash
npm install
```

4. Populate `.env.dev` file based on `.env.dev.example`.
5. Apply database migrations.

```bash
export DATABASE_URL=${DATABASE_URL} && export PORT=${PORT} && npx prisma migrate dev
```

6. Build the application.

```bash
npm run build
```

7. Run the application.

```bash
npm start
```

### With Docker:

1. Clone this repository.
2. Populate `.env` file based on `.env.example`.
3. Build Docker image

```bash
docker-compose up
```

## 🧪 Testing

### ✋ Manual tests:

1. Run the application.

```bash
npm run dev
```

2. Use `bruserapiCollection` to test the application endpoints with ThunderClient.

### 🤖 Automated tests:

1. Populate `.env.test` file based on `.env.test.example`.
2. Type this command to run the tests:

```bash
npm run test
```