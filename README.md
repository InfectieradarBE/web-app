# Webapp

#NOTE: THIS REPOSITORY IS NOW ARCHIVED, PLEASE CHECK [PARTICIPANT-API](https://github.com/InfectieradarBE/participant-webapp) FOR THE LATEST WEB-APP.

## Dependencies
To display some icons this project is using font-awesome free icons.


## Configuration
The project uses environment variables defined through the node js environment.

Add the `.env.local` file for example to define these variables.

Supported variables:
```
REACT_APP_DEFAULT_INSTANCE=<instance name>
REACT_APP_API_BASE_URL=<participant API url>

REACT_APP_DEFAULT_LANGUAGE=<language-code>
REACT_APP_FALLBACK_LANGUAGE=<language-code>

REACT_APP_CONTENT_URL=<full url of the content hosting>

REACT_APP_USE_RECAPTCHA=true
REACT_APP_RECAPTCHA_SITEKEY=<you receive the site key from Google>

REACT_APP_TITLE=<Your application name>
REACT_APP_DESCRIPTION=<your application description>
# CSP Header sources
REACT_APP_CSP_DEFAULT_SRC="'self'"
REACT_APP_CSP_MEDIA_SRC="'self'"
REACT_APP_CSP_IMG_SRC="'self'"
REACT_APP_CSP_STYLE_SRC="'unsafe-inline' 'self'"
REACT_APP_CSP_SCRIPT_SRC="https://www.gstatic.com/ https://www.google.com/ 'self' 'unsafe-eval'"
REACT_APP_CSP_CHILD_SRC="https://www.google.com/"
REACT_APP_CSP_CONNECT_URLS="<all urls which must be allowed in CSP connect-src, including PARTICIPANT-API SERVICE address, separated by spaces>"
```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
