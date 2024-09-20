# react-native-attribution-token

React Native module for fetching attribution token on iOS

## Requirements
- AdServices

## Installation

```sh
npm install react-native-attribution-token
```

## Usage


```js
import { getAttributionToken } from 'react-native-attribution-token';

// ...

const getToken = async () => {
  try {
    const token = await getAttributionToken();
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};
```

## Documentation

#### getAttributionToken()
Fetches the attribution token from the AdServices framework on iOS. Returns a promise that resolves to the attribution token.

On Android, this method will return a promise that resolves to null.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
