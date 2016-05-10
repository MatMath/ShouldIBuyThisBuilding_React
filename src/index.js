import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/Main';

// TODO: Initial Load of the data from the Node server like Building, interest rate, neighborhood code.
// Later we will call the API again with arguments to get the Average rentper neighborhood.

// TODO: Add a login? or we stay stateless with 1 page???

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
