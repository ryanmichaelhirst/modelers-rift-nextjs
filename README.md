# Typescript Webpack Starter

Base template for react projects. Includes webpack, babel, tailwind, prisma, docker dev setup, and github action deployment.

## Setup

Install node dependencies

```
npm install
```

If you plan to use docker-compose for your dev setup, install docker for your OS
`https://docs.docker.com/get-docker/`

## Dev

Run with webpack

```
npm run start
```

or with docker-compose

```
npm run up
```

## Deployment with Docker

Add the following to Github -> Settings -> Secrets -> Add Repository Secret

```
AWS_IP=your-ec2-aws-ip-address
AWS_KNOWN_HOSTS=rsa-encrypted-host-fingerprints
AWS_SSH_KEY=ssh-key-pair-pem
AWS_USER=ec2-user-name
```

When you push or merge to the branch 'production' the github action will automatically deploy your changes to your AWS EC2 Instance.

You can switch this branch in .github/workflows/deploy.yml

```
on:
  push:
    branches: [production]
``
```

## CSS with Tailwind

Instead of writing your own css classes, you can use the default classes from [Tailwind](https://tailwindcss.com/docs)

Look at [Card.tsx] for an example of some of their classes.

## Why aren't you using the offical webpack-hot-middleware?

The webpack-hot-middleware package currently has a bug with webpack v5 that causes HMR to stop working.
You can read about the [issue here](https://github.com/webpack-contrib/webpack-hot-middleware/issues/390)

This repo uses a branch until the issue is fixed.
`"webpack-hot-middleware": "git+https://github.com/lukeapage/webpack-hot-middleware#2cdfe0d0111dab6432b8683112fd2d17a5e80572"`
