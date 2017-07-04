# Pair Me
## Lighthouse Labs Final Project

Pair Me is a pair-programming platform that lets you do code-challenges at the same time. It helps doing code-challenges twice as fun with a random pair. A user can also choose an online friend to do the challenge with them. It utilizes the Ace Editor and running the code inputted to it in JS Sandbox library to help protect our app from untrusted code. GitHub credentials are used for authentication via Passport. Both users can type in the Ace editor to solve the challenge presented to them, and they also have the opportunity to chat with each other.

## Stack

- NodeJs
- Express
- React
- Socket.io
- PostgreSQL
- Knex
- BootStrap

## Screenshots

!["screenshot of the landing page"](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/landing-page.png)
!["screenshot of the main page"](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/main.png)
!["screenshot of the challenge page"](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/challenge-page.png)
!["screenshot of the send request page"](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/send-request.png)
!["screenshot of the cancel request page"](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/cancel-request.png)
!["screenshot of the profile page](https://github.com/Phlegz/pair.me/blob/master/client/styles/img/profile.png)


## Getting Started

### Client directory
1. Install dependencies: `npm i`
2. Fix to binaries for sass: `npm rebuild node-sass`
3. Run `npm run webpack:watch`

### Server directory
4. Create the `.env` by using `.env.example` as a reference in the same directory.
5. Update the .env file with your correct local information
6. Install dependencies: `npm i`
7. Run migrations on server : `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
8. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
9. Run the server: `npm start`
10. Visit `http://localhost:8080/`


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
