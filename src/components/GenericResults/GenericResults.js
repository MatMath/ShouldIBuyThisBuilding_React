// From what is display and inputed before, this is to display the summary of the calculated data.
import React from 'react';
require('./GenericResults.css');

// Alternative for CSS would be to use withStyles but that add a library.
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// and to export withStyles(GenericResults, cssImportedFile)

class GenericResults extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true
		}
	}
	render() {
		console.log('this is props:', this.props.calcParam);
		const {houseValue, downPayment, fixExpenses, nbrAppartment, averageRent, PMT} = this.props.calcParam;
	    return (
	    	<div>
		      <div className='row'>
		        <div className='col-sm-3'>Mortgage total</div>
		        <div className='col-sm-3 bg-info'>{parseInt(houseValue*(1 - downPayment/100))}$</div>
		        <div className='col-sm-3'>Down Payment</div>
		        <div className='col-sm-3 bg-info'>{parseInt(downPayment*houseValue/100)}$</div>
		       </div>

		       <div classname='row'>
		        <div className='col-sm-3'>PMT</div>
		        <div className='col-sm-3 bg-info'>{PMT}$</div>
		        <div className='col-sm-3'>PMT after fix expenses and revenue</div>
		        <div className='col-sm-3 bg-info'>{parseInt(PMT)-parseInt(nbrAppartment)*parseInt(averageRent)}$</div>
		      </div>
		    </div>
	   );
	}
}

export default GenericResults;
