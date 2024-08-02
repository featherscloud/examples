# Feathers Cloud Examples

Examples to get started with Feathers Cloud Auth.

## Getting started

This repository contains examples for **adding scalable user authentication** to different API servers (NodeJS, Cloudflare and Deno) and web frontends (React, Vue, Svelte) using [Feathers Cloud Auth](https://feathers.cloud/auth).

To get started with Feathers Cloud Auth, sign up and create a new organization and application at

**[app.feathers.cloud](https://app.feathers.cloud)**

Then, with [NodeJS](https://nodejs.org/en) installed, clone this repository and install all dependencies:

```sh
git clone git@github.com:featherscloud/examples.git
cd examples
npm install
```

Make sure to copy your public application id from the dashboard to replace it in your server and frontend framework example files.

## Servers

The `server/` folder contains examples for verifying a request that uses a Feathers Cloud Auth access token and getting the user information. See below how to run it on different platforms.

### NodeJS

To start the plain HTTP NodeJS server server, replace `<your-app-id>` in `server/nodejs/server.mjs` with your application id. Then run

```
cd server/nodejs
npm start
```

### Express

To start a NodeJS server that uses [Express](https://expressjs.com/), replace `<your-app-id>` in `server/express/app.mjs` with your application id. Then run

```
cd server/express
npm start
```

### Deno

To run an API server using [Deno](https://deno.com/), you will need Deno installed and then replace `<your-app-id>` in `server/deno/server.ts` with your application id. Then run

```
cd server/deno
npm start
```

Alternatively the server can also be started without npm via

```
cd server/deno
deno run --allow-net server.ts
```

### Cloudflare Worker

To use Feathers Cloud Auth with a [Cloudflare worker](https://workers.cloudflare.com/), replace `<your-app-id>` in `server/cloudflare/index.ts` with your application id. Then run

```
cd server/cloudflare
npm start
```

To instantly deploy the worker you will need a free Cloudflare account, then you can run

```
npm run deploy
```

### BunJS

To run an API server using [Bun](https://bun.sh/), you will need it installed and then replace `<your-app-id>` in `server/bun/index.ts` with your application id. Then run

```
cd server/bun
npm start
```

## Frontends

With your server of choice still running, in a new terminal, chose a framework and follow the steps below. All frameworks are set up using [Vite](https://vitejs.dev/).

### ReactJS

To start the ReactJS frontend and make a request to the API server, replace `<your-app-did>` in `client/react/src/App.tsx` with your application id. Then run

```
cd client/create
npm run dev
```

Then go to [localhost:3000](http://localhost:3000). You should be redirected to your application login page and after successful login see the message from the running server.

### VueJS

To start the VueJS frontend and make a request to the API server, replace `<app-did>` in `client/vue/src/App.vue` with your application id. Then run

```
cd client/vue
npm run dev
```

Then go to [localhost:3000](http://localhost:3000). You should be redirected to your application login page and after successful login see the message from the running server.

### Svelte

To start the Svelte frontend and make a request to the API server, replace `<app-did>` in `client/svelte/src/App.svelte` with your application id. Then run

```
cd client/svelte
npm run dev
```

Then go to [localhost:3000](http://localhost:3000). You should be redirected to your application login page and after successful login see the message from the running server.
