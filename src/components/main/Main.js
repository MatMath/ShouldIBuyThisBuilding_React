require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Inputcontroller from '../Inputcontroller/Inputcontroller';
import GenericResults from '../GenericResults/GenericResults';

// This is Bad since it is outside a scope and just laying there, but What is the Main Scope without being a scope in React structure????
class AppComponent extends React.Component {
  constructor (props) {
  	super(props)
  	// note: If one element of the state change the Component redraw.
  	this.state = {
  		loading:false
  	}
  }
  render() {
  	const {buildingTypeList, neiborhoodlist, interestRate} = this.props.fetchedData;
    return (
      <div className='index container'>
  			<Inputcontroller buildingTypeList={buildingTypeList} neiborhoodlist={neiborhoodlist} interestRate={interestRate}/>
  			<GenericResults />
  			<div>Collapsable table of the expenses by months? year?</div>
  			<div>d3 Graph of the result expected</div>
      </div>
    );
  }
}

export default AppComponent;