---
published: true
title: 'Create an icon web font for your design system'
tags: designsystem, webdev, devops
path: '/articles/icon-web-font'
date: '2020-01-03'
description: 'Create an icon web font for your design system using Github Actions.'
dev_to_path: 'https://dev.to/brunnerlivio/create-an-icon-web-font-for-your-design-system-1ei6'
cover_image: 'https://github.com/BrunnerLivio/articles/blob/master/articles/icon-web-font/featured-img.png?raw=true'
---

Icons are an essential part of Design Systems and Brand Identity. At [Roche](https://www.roche.com/) we are building a UI Kit components library that should provide icons out of the box. For convenience and performance reasons we want to offer icons not only as SVG graphics but also as an icon web font.

In this article, I want to go in-depth on the technical side of things how we, at Roche, were able to **automate the conversion of SVG graphics to icon web fonts**.

> **No time to read articles? Head over to the final [repository](https://github.com/BrunnerLivio/dev.to-icon-webfont) directly.**

## Creating the Icon Font

Whilst there are many tools and websites to generate icon web fonts on the market, not many were sufficient enough. Our goal was to have a tool(-chain) that was able to run automatically inside a CI Pipeline of a Git repository, so the process would be automated. Manually generating the font by drag-and-dropping icon images into some arbitrary website was just not doing it for us.

That is why we were looking into CLI tools, which were as customizable as we needed it to be.

## Prepare the repository

The icon font shall be deployed as an NPM package. Therefore we need to create a new repository with a standard NPM setup. Make sure you have [NodeJS 10.x.x](https://nodejs.org/en/) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

```bash
# Create the repository directory
mkdir my-icon-font && cd my-icon-font

# Initialize Git and NPM
git init
npm init -y

cat > .gitignore <<EOF
node_modules
# Ignore the generated assets
font/*[.svg, .eot, .css, .ttf, .woff, .woff2, .html, .json]
EOF

touch .npmignore

# Create the directory for the icons
mkdir svg font

```

Let's copy over our SVG icons into the newly created `my-icon-font/svg`-directory.

For the sake of convenience, I am going to use icons from [flaticon.com](https://www.flaticon.com). Go to the page, click on an icon you would like and download it as SVG image.
![Download SVG image from flaticon](https://thepracticaldev.s3.amazonaws.com/i/dakpe45wkavx1spjcuzv.png)

... and copy it over.
```bash
mv /Path/To/Downloads/icon.svg svg/
```

## Install icon-font-generator

[Icon Font Generator](https://www.npmjs.com/package/icon-font-generator) is a CLI tool built with NodeJS and available through NPM.

Let's check whether we can run the tool.

```bash
npx icon-font-generator --help
```

## Generate the icon font

Let's generate the icon font using `icon-font-generator` like so.

```bash
npx icon-font-generator svg/*.svg \
-o font/ \
--name "my-icon-font" \
--height 100
```

In your `my-icon-font/font`-directory you should now find the following files.

```
font
├── my-icon-font.css # CSS file which includes the icon fonts and generates classes
├── my-icon-font.eot # The icon font file in EOT format
├── my-icon-font.html # A preview website of the icon font
├── my-icon-font.json # Icon metadata in JSON
├── my-icon-font.svg # The icon font file in SVG format
├── my-icon-font.ttf # The icon font file in TTF format
├── my-icon-font.woff # The icon font file in WOFF format
└── my-icon-font.woff2 # The icon font file in WOFF2 format
```

Let's open up the `font/my-icon-font.html` file to see whether the icons look fine.

![Icon Preview Site](https://thepracticaldev.s3.amazonaws.com/i/jkkiog4mzgeymwp3s2k3.png)

Awesome!

If we sneak peek into the CSS file `font/my-icon-font.css`, we will see how it all works.

These following lines define our custom font, called "my-icon-font". As you can see, it makes use of all the generated font files. Therefore if a browser does not support a font format (e.g. SVG), it will fall back to another one.

```css
@font-face {
    font-family: "my-icon-font";
    src: url("./my-icon-font.eot?65e38a3078508e502b3cc8df63e55a16?#iefix") format("embedded-opentype"),
url("./my-icon-font.woff2?65e38a3078508e502b3cc8df63e55a16") format("woff2"),
url("./my-icon-font.woff?65e38a3078508e502b3cc8df63e55a16") format("woff"),
url("./my-icon-font.ttf?65e38a3078508e502b3cc8df63e55a16") format("truetype"),
url("./my-icon-font.svg?65e38a3078508e502b3cc8df63e55a16#my-icon-font") format("svg");
}
```

The next lines define the styling of the icon itself. Every `i`-HTML Element which begins with class `icon-*` will apply our icon font.

```css
i[class^="icon-"]:before, i[class*="icon-"]:before {
    font-family: my-icon-font !important;
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

For each specific icon, an additional class is being generated with a unique Unicode which represents our icon. 

```css
.icon-contact-list:before {
    content: "\f101";
}
.icon-groups:before {
    content: "\f102";
}
```

If we include this CSS file in an HTML document, we can access the icon like this.

```html
<!-- Include the CSS file (only once) -->
<link rel="stylesheet" type="text/css" href="my-icon-font.css" />

<i class="icon-contact-list"></i>
```

## Compress SVG and fix odd-looking icons

In our case, some of the icons had strange strokes or sometimes not circular, when they needed to be.

![odd-looking icon](https://thepracticaldev.s3.amazonaws.com/i/1tl955eowa2nunq52hjv.png)


To fix this and also, in addition, compress the SVG images, we can use the [SVGO CLI tool](https://github.com/svg/svgo).
SVGO, in short, is a tool to optimize SVG graphics.

Lets set up the configuration we are going to need to fix the faulty icons.

```bash
cat > config.yml <<EOF
plugins:
  - convertPathData:
      noSpaceAfterFlags: false
  - mergePaths:
      noSpaceAfterFlags: false
EOF
```

... and execute it.

```bash
npx svgo svg/*.svg -o icons --config config.yml
```

Now the icons should look all fine!

So we do not forget the commands we have executed, let's add it to our package.json and install the tools locally.

```bash
npm i -D svgo icon-font-generator
```

`package.json`

```json
{
  "scripts": {
    "build": "npm run icons:compress && npm run icons:font",
    "icons:compress": "svgo svg/*.svg -o svg --config config.yml",
    "icons:font": "icon-font-generator svg/*.svg -o font/ --name \"my-icon-font\" --height 100"
  }
}
```


## Automate it using Github Actions

We want to re-generate the icon fonts on every commit using Github Actions.
In order to get set up, we need to create a configuration file, which defines the workflow of our pipeline.

```bash
mkdir -p .github/workflows

touch .github/workflows/nodejs.yml
```

We can keep the configuration file simple for now. We are just going to use NodeJS 10, install our dependencies and run `npm run build`.

`.github/workflows/nodejs.yml`

```yml
name: Node CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10.x]

    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install and build
      run: |
        npm ci
        npm run build
      env:
        CI: true
```

To see whether everything works, let's commit it to our remote repository.

```bash
git remote add origin <YOUR_GITHUB_URL>
git add -A .
git commit -m "Initial Commit"
git push origin master
```

Your repository should now tell you whether everything is set up correctly.

![Github Action Run](https://thepracticaldev.s3.amazonaws.com/i/zdo4h2nzhn27cppu7kcb.png)

## Continous Deployment using Semantic Release

The last step to fully automate this process is to publish an NPM package and ZIP file using Semantic Release to our end customer. We can use [Semantic Release](https://github.com/semantic-release/semantic-release) for that, which offers fully automated version management and package publishing.

First things first, let's reset our `package.json`-version.

`package.json`
```json
{
  "version": "0.0.0-development"
  ...
}
```

Semantic Release will automatically increment our versioning from here on out. 

The next thing we need to do is adding an NPM Access Token to Github Actions.

Head over to [npmjs.org](https://npmjs.org) > Login > Click on Profile > Auth Tokens > Create new Token.

![NPM Personal Access Token](https://thepracticaldev.s3.amazonaws.com/i/e939k4ks3f3ankafpn4r.png)

Once you have gathered your NPM token, head over to Github.
Goto **Your Repository** > Settings > Secrets > Add a new Secret.
Call it `NPM_TOKEN` and add the copied key.

![Add NPM Token secret](https://thepracticaldev.s3.amazonaws.com/i/3cz9j2p7hgx9hbdcbyu5.png)

Once added, we only need to update our `.github/workflows/nodejs.yml` file and we should be good to go.

```yml
    ...
    - name: Semantic Release
      run: npx semantic-release
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Once a new SVG icon is now being added via a commit, it should now automatically publish the NPM package and create a Github release.
Make sure you start the commit message with `feat(): <MESSAGE>`.

![Github Release](https://thepracticaldev.s3.amazonaws.com/i/va7gohkbm0btbvu62lio.png)

## Conclusion

This setup is definitely pretty advanced, but the benefits are huge. Automate this process using a pipeline backed by a version control system helps us to develop an icon pack for the long term.

A UI/UX designer could create Pull Request by themselves on Github using the Web interface. Since the icon fonts get generated using Github Actions, icon contributors do not need to download any tooling.

## Resources

- [Showcase Github Repository](https://github.com/BrunnerLivio/dev.to-icon-webfont)

> Found a Typo? [Let me know!](https://github.com/BrunnerLivio/articles)
