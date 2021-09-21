- Use GraphQL API: https://www.graphql-tools.com/docs/introduction
- It's a good idea to treat GraphQL as a thin API and routing layer. This means that your actual business logic,
  permissions, and other concerns should not be part of your GraphQL schema. For large apps, we suggest splitting your
  GraphQL server code into 4 components: Schema, Resolvers, Models, and Connectors, which each handle a specific part of
  the work.
- There's no need to reinvent the login process in GraphQL. Every server framework already has a wealth of technologies
  for auth, file uploads, and more. It's prudent to use those standard solutions even if your data is being served
  through a GraphQL endpoint, and it is okay to have non-GraphQL endpoints on your server when it's the most practical
  solution. (e.g. http://www.passportjs.org/)
- Fetch emojis from https://emojiapi.dev/ (e.g https://emojiapi.dev/api/v1/red_heart.svg)

## TODOs
- some todo

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.
