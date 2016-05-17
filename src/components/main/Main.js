require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Inputcontroller from '../Inputcontroller/Inputcontroller';
import GenericResults from '../GenericResults/GenericResults';

// This is Bad since it is outside a scope and just laying there.
// In the State = Pollute the state with useless data.
// Outside the state = will not render.
var calcParam = {
  houseValue: 500000,
  downPayment: 10,
  intRate: 0,
  fixExpenses: 1.75,
  oneTimeExpenses: 1,
  nbrAppartment: 1,
  averageRent:0,
  PMT:0
};

// The House value will increase with time, that mean:
// The Fix expenses will increase (Taxes, renovation).
// The Rent income will increase.
// PMT is constant since the mortgage will not increase with time.
var mortgateTable = [
  {
    period: 0,
    houseValue:100,
    mortgateValue : 90,
    pmt: 3,
    interest: 2,
    rentIncome: 1,
    fixExpenses: 1,
    totalPmt: 3
  }
];

function buildMortgageTable (houseValue, mortgateValue, rentIncome, fixExpenses) {
  if (houseValue, mortgateValue, rentIncome, fixExpenses) {

  }
}

class AppComponent extends React.Component {
  constructor (props) {
  	super(props)
  	// note: If one element of the state change the Component redraw.
  	this.state = {
  		loading:false
  	}
    this.extractParamForCalculation = this.extractParamForCalculation.bind(this);
  }
  extractParamForCalculation(importantParam) {
    if (importantParam) {
      // In the State = Pollute the state with useless data.
      // Outside the state = will not render.
      calcParam = importantParam;
      // TODO: Extract the basic information
    }
  }

  render() {
  	const {buildingTypeList, neiborhoodlist, interestRate} = this.props.fetchedData;
    return (
      <div className='index container'>
  			<Inputcontroller
          buildingTypeList={buildingTypeList}
          neiborhoodlist={neiborhoodlist}
          interestRate={interestRate}
          extractParamForCalculation={this.extractParamForCalculation}/>
  			<GenericResults calcParam={calcParam} />
  			<div>Collapsable table of the expenses by months? year?</div>
  			<div>d3 Graph of the result expected</div>
      </div>
    );
  }
}

export default AppComponent;