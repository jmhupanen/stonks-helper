# Stonks Helper

A trading journal for tracking and planning your trades. Frontend implementation with ReactJS, and backend implementation with Node.js, Express.js and MongoDB.

## Requirements

Node.js dependencies
```
npm install
cd client
npm install
```

## Env variables

Create a 'config.env' file in the 'config' directory with the following contents
```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your mongodb uri>
JWT_SECRET = 'abc123'
```

## How to run

### Frontend & Backend
```
npm run dev
```

### Backend only
```
npm run server
```
Frontend running on port 5000: http://localhost:5000

### Frontend only
```
npm run client
```
Frontend running on port 3000: http://localhost:3000