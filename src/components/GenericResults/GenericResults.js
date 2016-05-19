// From what is display and inputed before, this is to display the summary of the calculated data.
import React from 'react';
require('./GenericResults.css');
import {convertToCurrency} from '../utils';

// Alternative for CSS would be to use withStyles but that add a library.
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// and to export withStyles(GenericResults, cssImportedFile)

class GenericResults extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pmt: this.props.calcParam.pmt
		}
	}
	render() {
		const {mortgage, downPayment, pmt, currentValue, initialLoanMoney} = this.props.calcParam;
		const goodIngestment = (<span className='bg-success'><strong>Building:</strong> That mean buying the building is {convertToCurrency(currentValue-initialLoanMoney)}$ <strong>more valuable</strong></span>);
		const badinvestment = (<span className='bg-danger'><strong>Long term loan: </strong>That mean buying the building is <strong>less profitable</strong> of {convertToCurrency(initialLoanMoney-currentValue)}$ than direct portfolio investment.</span>);
	    return (
	    	<div>
		      <div className='row'>
		        <div className='col-sm-2'>Mortgage total</div>
		        <div className='col-sm-2 bg-info'>{convertToCurrency(mortgage)}$</div>
		        <div className='col-sm-2'>Down Payment after expenses</div>
		        <div className='col-sm-2 bg-info'>{convertToCurrency(downPayment)}$</div>
		        <div className='col-sm-2'>PMT</div>
		        <div className='col-sm-2 bg-info'>{convertToCurrency(pmt)}$</div>
		      </div>
		      <div className='row'>
		      	<div className='col-sm-2'>Current Value opportunity: </div>
		      	<div className='col-sm-2 bg-info'>{convertToCurrency(currentValue)}$</div>
		      	<div className='col-sm-2'>vs initial down payment: </div>
		      	<div className='col-sm-2 bg-info'>{convertToCurrency(initialLoanMoney)}$</div>
		      </div>

		      <div className='row'>
		      	<div className='col-sm-2'><strong>What it mean:</strong></div>
		      	<div className='col-sm-10'>
		      		If we invest in that building with the current assomption, the current value of that investment is {convertToCurrency(currentValue)}$
		      		<br/>If we compare that to simply investing the in initial load of {convertToCurrency(initialLoanMoney)}$ in the market at a the same long therm rate.
		      		<br/>{currentValue > initialLoanMoney ? goodIngestment : badinvestment}
		      	</div>
		      </div>
		    </div>
	   );
	}
}

export default GenericResults;
