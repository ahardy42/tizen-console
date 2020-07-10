# tizen-console

This is a package for adding a console window **React** component to a Tizen App running on a Samsung TV. Anything you have logged to the console will show up (excluding any filtered logs). there is an input for calling functions. anything you write into the input will be logged when you hit the enter key.

This package is a work in progress!! feel free to submit PRs for new and better features!

## Installation:

To install all dependencies run:

```
npm i
```

It will install:

- `dependencies` and `devDependencies` from ./package.json
- `peerDependencies` from ./package.json thanks to `install-peers-cli`
- `dependencies` and `devDependencies` from ./example/package.json (example `create react app` for testing)

## Utilization

install the package

```
npm install tizen-console
```

be sure that your tizen project `config.xml` has the following priviledges enabled (at minimum):

```xml
<tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
<tizen:privilege name="http://developer.samsung.com/privilege/productinfo"/>
```

the package uses React and React-DOM as peer-dependencies so you will need to have those installed.

in your App component, as high in the tree as possible, add the TizenConsole component like so:

```js
import React, { Component } from 'react';
import SomeComponent from './SomeComponent';
import SomeOtherComponent from './SomeComponent';
import { TizenConsole } from 'tizen-console';

class App extends Component {
  render() {
    return (
      <div>
        <TizenConsole size="lg" corner="tl" />
        <SomeComponent />
        <SomeOtherComponent />
      </div>
    );
  }
}

export default App;
```

### Props

```ts
interface TizenConsoleProps {
  size: 'sm' | 'md' | 'lg';
  corner: 'tr' | 'tl' | 'br' | 'bl';
  filter?: Methods[];
}

type Methods =
  | 'log'
  | 'warn'
  | 'error'
  | 'info'
  | 'debug'
  | 'table'
  | 'time'
  | 'clear'
  | 'timeEnd'
  | 'count'
  | 'assert';
```

corner specified which corner of the TV window the console will be and size indicates the size of the console. Methods are an array of filter methods used to show only the types of console methods you want displayed.

## using the console

activate and de-activate the console by pressing the red A button on your remote.
the keyboard will open indicating that the input is active. type a function to log the result of the console and press the enter key

## credits

used the following npm packages to create this app

- [React](https://reactjs.org/)
- [styled-components](https://styled-components.com/)
- [consle-feed](https://github.com/samdenty/console-feed)

and used the boilerplate ts project found at https://github.com/michal-wrzosek/react-component-lib
