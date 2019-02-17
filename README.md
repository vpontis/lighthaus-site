# Lighthaus Website

## Deploy

This site is hosted on Netlify. It rebuilds with every `git push`.

When Netlify gets a new build it runs `yarn build && yarn export` which generates a static HTML site
in the `out/` folder.

The content for this site is pulled from [contents.io](https//contents.io). A publish on Contents should
trigger a rebuild of the site.

## Running Locally

```
yarn
yarn dev
# Open localhost:3000 in your browser
```