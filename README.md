# auth-starters

Examples to get started with Feathers Cloud Auth.

## Getting started

Sign up and create a new organization and application at

**[app.feathers.cloud](https://app.feathers.cloud)**

Then, with [NodeJS](https://nodejs.org/en) installed, clone this repository and install all dependencies:

```sh
git clone git@github.com:featherscloud/auth-starters.git
cd auth-starters
npm install
```

## NodeJS (Express)

To start the NodeJS [Express](https://expressjs.com/) example API server, replace `<app-did>` in `express-server/app.mjs` with your application id. Then run

```
cd express-server
npm start
```

## Frontends

With the server running, in a new terminal, chose your framework (React or VueJS) and follow the steps below.

### ReactJS

To start the ReactJS frontend and make a request to the API server, replace `<app-did>` in `react-app/src/App.tsx` with your application id. Then run

```
cd react-app
npm start
```

Then visit the URL shown in the terminal. You should be redirected to the Feathers Cloud Auth login page.

### VueJS

To start the VueJS frontend and make a request to the API server, replace `<app-did>` in `vue-app/src/App.vue` with your application id. Then run

```
cd vue-app
npm dev
```

Then visit the URL shown in the terminal. You should be redirected to the Feathers Cloud Auth login page.
