### Setup

You need to install MongoDB on your machine. Follow these [instructions](https://docs.mongodb.com/manual/installation/).

### Config

To make it work create a `.env` file in the root and add the following:

```bash
# .env

PORT=5000
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=1234

# ugly - nothing at stake here - only to make setup faster
NODE_PRIVATE_KEY=8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
ETH_TO_FUND=1

# PROD
WEB3_URI_PROD=<vm_ip_address>:8545
MONGO_URI_PROD=mongodb://localhost:27017/colloc-chain-prod

# DEV
WEB3_URI_DEV=<vm_ip_address>:8545
MONGO_URI_DEV=mongodb://localhost:27017/colloc-chain-dev
```

### Usage

Clone repository

```bash
$ git clone https://github.com/Colloc-Chain/server
```

Install dependencies, please use [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable) instead of npm.

```bash
$ yarn
```

To start the server

```bash
$ yarn dev
```

To check errors

```bash
$ yarn lint
```

### Contribute

Please **do not** push directly on `main` and `dev` branches.

Create your branch from `dev` branch.

```bash
$ git checkout -b feature/<your_feature> dev
```

Do your stuff then commit.

```bash
$ git add <your_changes>
$ git commit -am "<your_message>"
$ git push -u origin feature/<your_feature>
```

Go on github and create a pull request to the `dev` branch.
