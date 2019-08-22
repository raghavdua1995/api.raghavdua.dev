

  <h3 align="center">api.raghavdua.dev</h3>

  <p align="center">
    RESTful API to fetch data for <a href="https://raghavdua.dev">raghavdua.dev</a> from Google Firebase
<br />
<br />
<a href="https://github.com/raghavdua1995/api.raghavdua.dev/issues">Report An Issue</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Running](#running)
* [Roadmap](#roadmap)
* [License](#license)


<!-- ABOUT THE PROJECT -->
## About The Project

This is a RESTful API for [raghavdua.dev](https://raghavdua.dev), it fetches the data stored in a Google Firebase Realtime Database, encodes it be rendered as HTML content and forwards it to the client.

### Built With

This RESTful API wouldn't have been possible without these amazing frameworks, libraries, services & tools

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Google Firebase](https://firebase.google.com/)
* [Sentry](https://sentry.io/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* [Node.js  >=12.9.0](https://nodejs.org/dist/)
* [Yarn >=1.17.3](https://yarnpkg.com/en/docs/instal)

### Installation
1. Clone the repo:
```sh
git clone https:://github.com/raghavdua1995/api.raghavdua.dev.git
```
2. Install Node.js packages:
```sh
yarn install
```
3. Create a new directory with the name 'credentials' in the config folder:
```sh
mkdir config/credentials
```
4. Copy and paste credential files in the newly created config/credentials directory.


<!-- Running -->
## Running

* Running for production:
```sh
yarn start
```
* Running for testing/development:
```sh
yarn test
```

<!-- ROADMAP -->
## Roadmap

See [open issues](https://github.com/raghavdua1995/api.raghavdua.dev/issues) for a list of known issues.


<!-- LICENSE -->
## License

Distributed under the MIT License. See LICENSE.txt for more information.
