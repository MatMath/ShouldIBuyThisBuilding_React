require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Inputcontroller from '../Inputcontroller/Inputcontroller';
import GenericResults from '../GenericResults/GenericResults';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
      	TODO: Add Bootstrap classes.
  		50% width Container for the Building components inside should be a list of different Element of the structure
  		<Inputcontroller />
  		<GenericResults />
  		<div>Collapsable table of the expenses by months? year?</div>
  		<div>d3 Graph of the result expected</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
