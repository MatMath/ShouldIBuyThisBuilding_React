require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
      	TODO: Add Bootstrap classes.
  		50% width Container for the Building components inside should be a list of different Element of the structure
  		<div>Select Building Type -> Dropdown from a fetched list</div>
  		<div>Select Building Neiborhood -> Autocomplete from a fetched list</div>
  		<div>Building Value + Down Payment OR value -> Extract value out of the Building down back into the Calculation</div>
  		<div>Select Mortgage % value</div>
  		<div>Estimate The average rent</div>
  		<div>Fix expenses % taxes</div>
  		<div>Welcome taxes Calculation display</div>
  		<div>Total to pay</div>
  		<div>Collapsable table of the expenses by months? year?</div>
  		<div>d3 Graph of the result expected</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
