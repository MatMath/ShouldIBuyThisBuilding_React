require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Inputcontroller from '../Inputcontroller/Inputcontroller';
import GenericResults from '../GenericResults/GenericResults';
import TableDisplayOfTheMortgage from '../tableDisplayOfTheMortgage/tableDisplayOfTheMortgage';

// The House value will increase with time, that mean:
// The Fix expenses will increase (Taxes, renovation).
// The Rent income will increase.
// PMT is constant since the mortgage will not increase with time.
var mortgateTable = [];

function calculateThePV (principal, monthIntRate, nbrPer) {
  // assume monthIntRate is already composed with 1 for simplicity later
  return (principal*monthIntRate)/(1-1/Math.pow((1+monthIntRate),nbrPer));
}

function buildMortgageTable (tablePmt, fixExpRatio, monthIntRate, pmt) {
  // One of many website that give formulas for compound interest: https://en.wikipedia.org/wiki/Compound_interest#Monthly_amortized_loan_or_mortgage_payments
  // Note: https://github.com/cristobal-io/mortgage-calculator give awesome API, but not exactly what I need.
  const perr = tablePmt.length;
  let {mortgateValue, houseValue, rentIncome} = tablePmt[perr-1];
  if (perr%12 === 0) {
    // Every year we increase the rent of 1.5% --> To extract from Quandl maybe.
    rentIncome *= 1.015;
    houseValue *= 1.02;
  }
  mortgateValue = mortgateValue * (1+monthIntRate) - pmt;
  //HouseValue increase could be extracted historically from Quandl
  const itemToPush = {
    period: perr,
    houseValue: houseValue,
    mortgateValue : mortgateValue,
    pmt: pmt,
    interest: mortgateValue * monthIntRate,
    rentIncome: rentIncome,
    fixExpenses: houseValue*fixExpRatio,
    totalPmt: pmt + houseValue*fixExpRatio - rentIncome
  };

  if (mortgateValue > 0 && perr < 500) {
    tablePmt.push(itemToPush);
    return buildMortgageTable(tablePmt, fixExpRatio, monthIntRate, pmt);
  } else {
    return tablePmt;
  }
}

function getInvestmentReturnValue(arrayToReduce, reducingFactor) {
  // How it work: We take everything we pay over time and make it as today value. 
  // We take how much we can sell the building at the end and transpose it as today value. 
  // The reducingFactor need to match the current period. 
  let totalPaidInCurrentValue = arrayToReduce.reduce(function(previousValue, currentValue) {
    let oldValue = previousValue.totalPmt;
    let newValue = currentValue.totalPmt * Math.pow((1/reducingFactor),currentValue.period)
    console.log(oldValue, newValue);
    return {
      totalPmt: oldValue+newValue,
      period: previousValue.period
    };
  });

  let lastItem = arrayToReduce.pop();
  let totalReceiveInTheFuture = lastItem.houseValue * Math.pow((1/reducingFactor),lastItem.period);
  return totalReceiveInTheFuture - totalPaidInCurrentValue.totalPmt;
}

class AppComponent extends React.Component {
  constructor (props) {
  	super(props)
  	// note: If one element of the state change the Component redraw.
  	this.state = {
  		loading:false,
      calcParam: {
        mortgage: 0,
        downPayment: 0,
        pmt: 0
      }
  	}
    this.extractParamForCalculation = this.extractParamForCalculation.bind(this);
  }
  extractParamForCalculation(importantParam) {
    if (importantParam) {
      // In the State = Pollute the state with useless data.
      // Outside the state = will not render.
      // Extract the Payment
      let nbrPmtPerYear = 12;
      let principal = importantParam.houseValue * (1- (importantParam.downPayment/100 - importantParam.oneTimeExpenses/100));
      let monthIntRate = importantParam.intRate / nbrPmtPerYear / 100;
      let fixExpRatio = importantParam.fixExpenses / nbrPmtPerYear / 100;
      let nbrPer = importantParam.nbrYears * nbrPmtPerYear;
      let pmt = calculateThePV(principal, monthIntRate, nbrPer);
      let rentIncome = importantParam.nbrAppartment * importantParam.averageRent;

      mortgateTable = [{
        period: 0,
        houseValue: importantParam.houseValue,
        mortgateValue : principal,
        pmt: pmt,
        interest: 0,
        rentIncome: rentIncome,
        fixExpenses: 0,
        totalPmt: 0
      }];
      mortgateTable = buildMortgageTable(mortgateTable, fixExpRatio, monthIntRate, pmt);
      mortgateTable.shift(); //Removign the initial element since they will be display as a summary somewhere else.

      // calcParam In the State = Pollute the state with useless data.
      // Outside the state = will not render.
      let calcParam = {
        mortgage: principal,
        downPayment: importantParam.houseValue*(importantParam.downPayment - importantParam.oneTimeExpenses)/100,
        pmt: pmt,
        currentValue: getInvestmentReturnValue(mortgateTable, 1.0058)
      };
      this.setState({calcParam: calcParam});
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
  			<GenericResults calcParam={this.state.calcParam} />
        { mortgateTable.length ? <TableDisplayOfTheMortgage mortgateTable={mortgateTable}/> : null }
  			<div>d3 Graph of the result expected</div>
      </div>
    );
  }
}

export default AppComponent;