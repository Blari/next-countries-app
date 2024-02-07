This is my Next.js project that leverages cool technologies like React Query, TypeScript, and Tailwind CSS to create an interactive list of countries.

## Features

- Country list based on the ISO-4217 data.
- Currency activation toggles for each country.
- Persistence of currency state in `localStorage`.
- Modern and attractive UI powered by Tailwind CSS.

## Running the Application

### Run Without Docker

Ensure you have `node` and `yarn` installed. Then run the following commands in your terminal:

```bash
yarn install
yarn dev 
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Run With Docker Compose

To use Docker Compose to run the application, follow these steps:

```bash
docker-compose build
docker-compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).