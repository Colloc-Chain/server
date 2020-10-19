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
