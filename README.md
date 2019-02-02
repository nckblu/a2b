# a2b me

A simple frontend application for getting price estimates for journeys

Live demo: [http://a2b.me.uk](http://a2b.me.uk)

## Development
This project makes use of the following technologies and is bootstrapped with CRA.

* React
* Redux
* Redux Saga
* [React Spring](https://github.com/react-spring/react-spring)

### Commands

`yarn start` Starts the dev task for active development.

`yarn build` Builds the production build.

`yarn test` Runs tests.

### API
While the application makes use of both the [HERE API](https://developer.here.com/) and the [Uber API](https://developer.uber.com/) the request are proxied and formatted using the a2b me API project built with Laravel.
