# Rodeo Challenge - 8 hours

[Demo page](https://joaogardenberg-challenges.github.io/rodeo-challenge/)

**Note 1: The mocking is dynamic, both in content and in size. Every time you refresh the page, a new randomly-generated invoice is rendered.**

**Note 2: Although I'm used to having these kinds of price calculations made in the backend, in this challenge they were made in the frontend instead, just for the sake of it, since the challenge doesn't require a backend.**

**Note 3: Not all files have unit tests due to lack of time. However, most of them do. Also, no integration & e2e tests.**

**Note 4: I didn't have time to make it responsive.**

**Note 5: I struggled a bit to spread the Phase's fee/discount throughout the cost items, since they need to be applied before the tax. I came out with a solution that won't work if the discount, divided by the number of cost items, is still higher than the actual price of the cost item. I was taking too long to figure that logic out and decided to move on to other stuff.**

**Note 6: I went over 8 hours while writing the React components' tests, because I got my head so deep into it.**

**Note 7: I wasn't sure what you meant by designing the API endpoints while using GraphQL, so I just made the mockRequest service with the schema.**

## Install the dependencies

```
$ npm install
```

## Run the app

```
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run the tests

```
$ npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Generate the production build

```
$ npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
