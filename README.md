### Framework Reference website: 

https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website

### ADB Search Website

https://www.adb.org/search


## Running the website

First, install the dependencies (the install command will fetch all the dependency packages listed in the project's package.json file).

```
cd express-adb-web
```

```
npm install
```

Then run the application.

On macOS or Linux, use this command:
```
DEBUG=express-adb-web:* npm start
```

Then load http://localhost:3000/ in your browser to access the app.

For ubuntu:

1. Edit package.json

{
  "name": "express-adb-web",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www" --> change to "nodejs ./bin/www
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11",
    "request": "^2.88.0"
  }
}

