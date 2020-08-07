# tizen-console

This is a package for adding a console window **React** component to a Tizen App running on a Samsung TV. Anything you have logged to the console will show up (excluding any filtered logs). there is an input for calling functions. anything you write into the input will be logged when you hit the enter key.

This package is a work in progress!! feel free to submit PRs for new and better features!

## Installation:

To install all dependencies run:

```
npm install tizen-console
```

It will install:

- `dependencies` and `devDependencies` from ./package.json
- `peerDependencies` from ./package.json thanks to `install-peers-cli`
- `dependencies` and `devDependencies` from ./example/package.json (example `create react app` for testing)

## Utilization

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

activate and de-activate the console by pressing 12345 on your remote.
the keyboard will open indicating that the input is active. type a function to log the result of the console and press the enter key

## checking out the example app

to see the very simple example app in action:

first, clone the repo:

```
git clone https://github.com/ahardy42/tizen-console.git
cd tizen-console
npm install
```

Then, set up a tizen project using the [tizen cli](https://developer.tizen.org/development/tizen-studio/web-tools/cli#Create_project)

```
tizen create web-project -p tv-samsung-5.5 -t BasicEmptyProject -n example
cd example
rm -rf css
rm main.js
rm index.html
```

Then, replace the CERTIFICATE_PROFILE and TV_PROFILE values in the `MakeFile` with your own certs.

Then, update PACKAGE_ID values in the `MakeFile` to match the id found in the newly created `config.xml`

now you're ready to run the example app!

to run in your browser:

```
npm run dev
```

to run on your emulator (first, make sure the emulator is open and running on your machine):

run `npm run tizen`

to run on your tv (first make sure your tv is connected and running):

run `npm run tizen-tv`

## credits

used the following npm packages to create this app

- [React](https://reactjs.org/)
- [styled-components](https://styled-components.com/)
- [consle-feed](https://github.com/samdenty/console-feed)

and used the boilerplate ts project found at https://github.com/michal-wrzosek/react-component-lib
