# Deploy React App in GitHub Pages

## git remote

```
git remote add <name-of-remote> <url-of-repository>
```

```
 git push --set-upstream upstream master
```

## gh-pages

```
yarn add gh-pages
```

## deploy

```json
"scripts": {
    "start": "react-scripts start",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

```json
{
  "name": "starter-project",
  "homepage": "https://<user>.github.io/<project>/",
  "version": "0.1.0"
  //....
}
```

```
npm run deploy
```

Running the command above takes care of building your application and pushing it to a branch called gh-pages, which GitHub uses to link with GitHub Pages.

> If you did not name your remote origin, you will get an error during this phase stating that: Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option).

You will know that the process was successful if at the end of it you see the word Published. We can now head to our GitHub repository under Settings and scroll down to the GitHub Pages section.
