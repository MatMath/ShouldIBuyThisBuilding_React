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
		const {mortgage, downPayment, pmt, currentValue} = this.props.calcParam;
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
		      	<div className='col-sm-2'> Current Value: </div>
		      	<div className='col-sm-2 bg-info'>{convertToCurrency(currentValue)}$</div>
		      </div>
		    </div>
	   );
	}
}

export default GenericResults;
