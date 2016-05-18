import React from 'react';
import {convertToCurrency} from '../utils';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function format(cell, row){
  return  convertToCurrency(cell);
}

class TableDisplayOfTheMortgage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showFaq: false,
		}
		this.showHideFaq = this.showHideFaq.bind(this);
	}
	showHideFaq() {
		this.setState({showFaq: !this.state.showFaq});
	}
	render() {
		const {mortgateTable} = this.props;
		// console.table(mortgateTable);
		return (
			<div>
				<div className='text-center text-lg'>
					<h2 onClick={this.showHideFaq}>Table FAQ</h2>
				</div>
				<div> 
					{ this.state.showFaq ? <Faq /> : null }
				</div>
				<BootstrapTable
					data={mortgateTable}
					striped={true}
					height={300}>
				  <TableHeaderColumn dataField="period" isKey={true} dataSort={true}>Month</TableHeaderColumn>
				  <TableHeaderColumn dataField="houseValue" dataSort={true} dataFormat={format}>house Value</TableHeaderColumn>
				  <TableHeaderColumn dataField="mortgateValue" dataSort={true} dataFormat={format}>Mortgage</TableHeaderColumn>
				  <TableHeaderColumn dataField="rentIncome" dataSort={true} dataFormat={format}>Rent</TableHeaderColumn>
				  <TableHeaderColumn dataField="interest" dataSort={true} dataFormat={format}>Interest</TableHeaderColumn>
				  <TableHeaderColumn dataField="fixExpenses" dataSort={true} dataFormat={format}>Expenses</TableHeaderColumn>
				  <TableHeaderColumn dataField="totalPmt" dataSort={true} dataFormat={format}>Pocket PMT</TableHeaderColumn>
				</BootstrapTable>
			</div>
		)
	}

}

class Faq extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<div>
				<div className='row'>
					<div className='col-xs-2'><strong>Why House value increase?</strong></div>
					<div className='col-xs-10'>The mortgage will stay stable, but the house and land will gain value over time if we do minimal reparation on it. (Expenses)</div>
				</div>
				<div className='row'>
					<div className='col-xs-2'><strong>Why is the rent increasing?</strong></div>
					<div className='col-xs-10'>The mortgage will stay stable, but the cost of life increase so we expect the rent to be higher in 10 year than now.</div>
				</div>
				<div className='row'>
					<div className='col-xs-2'><strong>Why is the expenses increase?</strong></div>
					<div className='col-xs-10'>The expenses are a proportion of the cost of the house. More the price of the house increase, more the cost of material & labor increase. Taxes tend to increases over time also.</div>
				</div>
				<br />
			</div>
		);
	}
}

export default TableDisplayOfTheMortgage;

// period: 0,
// houseValue: importantParam.houseValue,
// mortgateValue : principal,
// pmt: pmt,
// interest: 0,
// rentIncome: rentIncome,
// fixExpenses: 0,
// totalPmt: 0