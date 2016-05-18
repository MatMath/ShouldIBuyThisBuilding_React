import React from 'react';
import {convertToCurrency} from '../utils';

class TableDisplayOfTheMortgage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
	}
	render() {
		const {mortgateTable} = this.props;
		// console.table(mortgateTable);
		return (
			<div>
				<div> FAQ (click expand/close)
					<div>Why House value increase?
						<div>The mortgage will stay stable, but the house and land will gain value over time if we do minimal reparation on it. (Expenses)</div>
					</div>
					<div>Why is the rent increasing?
						<div>The mortgage will stay stable, but the cost of life increase so we expect the rent to be higher in 10 year than now.</div>
					</div>
					<div>Why is the expenses increase?
						<div>The expenses are a proportion of the cost of the house. More the price of the house increase, more the cost of material & labor increase. Taxes tend to increases over time also.</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2">House Value</div>
					<div className="col-xs-2">Mortgage</div>
					<div className="col-xs-2">Rent</div>
					<div className="col-xs-2">Interest</div>
					<div className="col-xs-2">Expenses</div>
					<div className="col-xs-2">Pocket pmt</div>
				</div>
				/* Make a flexible tabke here, dont display all the data, but only 5 item at the time. */
				{mortgateTable.map((month, i) => {
                  const {period, houseValue, mortgateValue, rentIncome, interest, fixExpenses, totalPmt} = month
                  return (
					<div className="row" key={i}>
						<div className="col-xs-2">{period}. {convertToCurrency(houseValue)}</div>
						<div className="col-xs-2">{convertToCurrency(mortgateValue)}</div>
						<div className="col-xs-2">{convertToCurrency(rentIncome)}</div>
						<div className="col-xs-2">{convertToCurrency(interest)}</div>
						<div className="col-xs-2">{convertToCurrency(fixExpenses)}</div>
						<div className="col-xs-2">{convertToCurrency(totalPmt)}</div>
					</div>
                  )
              })}
			</div>
		)
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