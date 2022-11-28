---
published: true
title: 'Create your first module with Deno'
tags: deno, node, javascript, typescript
path: '/articles/create-your-first-module-with-deno'
date: '2020-02-21'
description: 'In this article, we want to have a look at how to get started with your first module using Deno. We will focus on the general structure and patterns which have emerged from the Deno community thus far.'
dev_to_path: 'https://dev.to/brunnerlivio/create-your-first-module-with-deno-575k'
cover_image: 'https://github.com/BrunnerLivio/articles/blob/master/articles/create-your-first-module-with-deno/featured-img.png?raw=true'
---


In this article, we want to have a look at how to get started with your first module using Deno. We will focus on the general structure and patterns which have emerged from the Deno community thus far.

> No time to read articles? Head right over [the repository](https://github.com/brunnerLivio/deno-lib-starter).

**Deno** is a secure runtime for JavaScript and TypeScript. It aims to provide a productive and secure scripting environment for the modern programmer. It is built on top of V8, Rust, and TypeScript. If you want to learn about Deno, I recommend [you watch the latest Deno talk](https://www.youtube.com/watch?v=1gIiZfSbEAE) by Ryan Dahl and Kitson Kelly, or check out the [official website](https://deno.land/).

Our desired outcome after this article should be:

- [Setup the development environment](#setup-the-development-environment)
- [Getting started with the file structure](#getting-started-with-the-file-structure)
  - [mod.ts](#modts)
  - [deps.ts](#depsts)
  - [mod_test.ts, test.ts and test_deps.ts](#modtestts-testts-and-testdepsts)
- [Tooling](#tooling)
- [Continous integration](#continous-integration)
- [Publishing](#publishing)
- [Conclusion](#conclusion)

## Setup the development environment

First things first, let's install Deno. You can find the installation instructions on [https://deno.land](https://deno.land/).

Check your installation by running the following command in your terminal.

```bash
deno -v
```

Once installed, I recommended installing the [justjavac.vscode-deno](https://github.com/justjavac/vscode-deno) extension for VSCode. At this moment you will most likely need some kind of plugin since the import statements of Deno are a little bit different than with Node.js.

![TypeScript import error with Deno](https://dev-to-uploads.s3.amazonaws.com/i/ki6lccl1ed9q7s2kaerj.png)

The vscode-deno extension fixes these kinds of remote imports by caching the typings in a special directory.

## Getting started with the file structure

To get started real quick, I have prepared a repository for you. Don't worry though, I will go over the files and directories in detail.

```bash
git clone https://github.com/BrunnerLivio/deno-lib-starter.git hello-deno
cd hello-deno
```

Before your muscle memory kicks in and you type `npm install` or `yarn` --  Let's check beforehand what we have in our folder.

```bash
├── deps.ts
├── .github
│   └── workflows
│       └── deno.yml
├── .gitignore
├── mod_test.ts
├── mod.ts
├── README.md
├── test_deps.ts
├── test.ts
└── tsconfig.json

```

### mod.ts

The `mod.ts` file is usually the entry point of your module. The Node.js equivalent would be `index.js`. Here we expose everything of our public API. Depending on how large your project is, you wanna keep the `mod.ts` file clean by only using `import` and `export`-statements, rather than defining actual functionality. 

In this starter module, I decided to not split it up, because from my point of view it is not necessary.

```typescript
// mod.ts
import { bold } from "./deps.ts";

/** Returns `Hello World` in bold */
export function getHelloWorld(): string {
  return bold("Hello World");
}

```

### deps.ts

> **Wait** -- where is my package.json?
 
No worries, we don't need a `package.json` when using Deno. Most Deno modules centralize their dependencies using a `deps.ts` file.

Let's have a look at how we structure this file.

```typescript
// deps.ts
// Add your dependencies in here
export { bold } from "https://deno.land/std@v0.32.0/fmt/colors.ts";

```

There a two major differences to Node.js:

- Import statements can make use of URLs
- Import statements must have a file ending

We are importing a module from the [Deno standard library](https://deno.land/std/) and exporting the `bold` function for our internal use. When importing from `deno.land` we can say

*"Whatever, just give me the latest and greatest..."*

```
https://deno.land/std/<PATH_TO_MODULE>.ts
```

or *"I do not like bungee jumping, please give a specific version"*

```
https://deno.land/std@{VERSION}/<PATH_TO_MODULE>.ts
```

In general, you should always import external modules using your `deps.ts` file. It is way easier to overview all your dependencies, rather than having to look in every single file.



### mod_test.ts, test.ts and test_deps.ts

Deno comes with a testing framework out of the box. It is simple, yet pretty useful and so far all I needed. To import the testing functions, we use a `test_deps.ts` file.

```typescript
// test_deps.ts
// Add your test dependencies in here
export { test, runTests } from "https://deno.land/std@v0.32.0/testing/mod.ts";
export { assertEquals } from "https://deno.land/std@v0.32.0/testing/asserts.ts";
```

Let's test our `mod.ts` then. Similarly to Node.js, where most projects use a `<NAME>.spec.ts` file for Unit Tests, we use `<NAME>_test.ts`.

Let's check whether our `getHelloWorld()` function from the `mod.ts` file returns a bold `Hello World` in a file called `mod_test.ts`.

```typescript
// mod_test.ts
import { test, assertEquals, runTests } from "./test_deps.ts";
import { getHelloWorld } from "./mod.ts";

test(function test_get_hello_world() {
  assertEquals(getHelloWorld(), "\x1b[1mHello World\x1b[22m");
});

runTests();
```

If we execute `deno ./mod_test.ts` in our shell, we should see that our test passes!

```
running 1 tests
OK     test_get_hello_world (0.00ms)

test result: OK 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (2.00ms)
```

Though, usually, you do not have a single test file in your repository (hopefully!!). That is why it is seen as best practice, to have a `test.ts` file in your repository, which simply imports all of your tests and runs them. While we are at it, let's move the `runTests()` function into the `test.ts` file.

```typescript
// test.ts
import { runTests } from "./test_deps.ts";

import "./mod_test.ts";

runTests();

```

With `deno test.ts` we should get the same result as before. That is about it for our file structure. Check out [Deno's official style guide](https://deno.land/std/style_guide.md) in case you are ever lost on how to structure/name things!


## Tooling

What I love about Deno are the out-of-the-box things you get. It does not stop there when it comes to tooling. Deno provides [Prettier](https://prettier.io/) formatting directly from the CLI.

Simply run `deno fmt **/*.ts` and it will format your code. No headaches which format rules are "trendy" currently. No more hunting for the latest and greatest Formatter which has been adopted the most by the community. It is all just there... almost...
When it comes to linting, there is not a as convenient solution yet. Deno is planning to support that too. Check out this [Github issue](https://github.com/denoland/deno/issues/1880) to stay up to date!

## Continous integration

Since our tooling is already installed with Deno, our CI configuration is really simple. In this article, we are going to make use of [Github Actions](https://github.com/features/actions). On top of that - to make our lives easier - we use [denolib/setup-deno](https://github.com/denolib/setup-deno) action to install Deno.

In our `.github/workflows/deno.yml` the file we can find the following configuration.

```yml
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        deno: [0.32.0, 0.31.0, 0.30.0]
    name: Test with Deno ${{ matrix.deno }} 

    steps:
      - uses: actions/checkout@master

      - name: Setup Deno
        uses: denolib/setup-deno@master
        with:
          deno-version: ${{ matrix.deno }}

      - name: Setup Node
        uses: actions/setup-node@master
        with:
          node-version: 12

      - name: Print deno version
        run: deno --version

      - name: Check format
        run: deno fmt --check **/*.ts

      - name: Run tests
        run: deno test.ts
```


So basically we are using a range of the latest Deno versions (from 0.30.0 to 0.32.0), check the formatting and run the tests. Pretty straight forward, isn't it?

## Publishing

In Deno, there is no such thing as publishing your module to a registry, owned by a company. As we learned before, we can simply import modules using URLs. Therefore any website (GitHub included) is our registry!
To make your module more visible, there is also a web interface on [deno.land/x/](https://deno.land/x/), which is home to third party Deno libraries. To submit your library there, simply go to the websites repository and edit the [`database.json`](https://github.com/denoland/deno_website2/blob/master/src/database.json) file.

![Edit database.json on Deno website repository](https://dev-to-uploads.s3.amazonaws.com/i/oq21omvrj1ezfwl4if5y.png).

Then add copy and paste the following JSON object into the file. Make sure you paste it in alphabetical order and don't use dashes `-` for module names. Use underscores `_` for spaces instead.

```json
"my_library_name": {
  "type": "github",
  "owner": "<MY_GITHUB_USERNAME>",
  "repo": "<MY_REPOSITORY_NAME",
  "desc": "<REPOSITORY_DESCRIPTION>"
},
```

Go to the bottom of the page, add a meaningful commit message and press the green `Propose file change` button.

![Propose file change on GitHub](https://dev-to-uploads.s3.amazonaws.com/i/lmr0khux2zhpfq7po17x.png)

Now we only need to create a Pull Request and wait for one of the maintainers' approval to merge.

![Create Pull Request on Github](https://dev-to-uploads.s3.amazonaws.com/i/0p9223o53wxo8q1tl1hi.png)

Your code will still be hosted on GitHub and you won't need to re-submit any code updates to deno.land. Therefore Continous Delivery is already a "given" with Deno.


## Conclusion

If I would need to pick only one thing I love the most about Deno, it is the tooling. Since Deno makes use of the TypeScript compiler, we do not have to transpile our code. Due to the integrated formatting and *soon* linter, we don't even have to care about downloading and configuring them.

I think Deno has a great future ahead. There are still a lot of things missing and I would not use it in production yet, but from what I have seen so far, **Deno has done a lot of things right!**
