import React from 'react';
import Autosuggest from 'react-autosuggest';
import {ButtonToolbar, DropdownButton, MenuItem, OverlayTrigger, Tooltip, Button} from 'react-bootstrap';
import {convertToCurrency} from '../utils';


require('./Inputcontroller.css');

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.Region;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.Region}, {suggestion.City}, {suggestion.Code}</span>
  );
}

function getBuildingList(neiborhoodCode, callback) {
  fetch('http://52.23.118.16/medRentOfArea/N'+neiborhoodCode,{
    method: 'GET',
    ContentType: 'json'
  })
  .then(function(res) {
    // This return the header call of the function, not the data.
    return res.json();
  })
  .then(function(data){
    // console.log('Got the medRentOfArea', data);
    if (data.AverageRent) {
      callback(data.AverageRent);
    }
  })
  .catch(function(ex) {
    // Fail to fetch so keep using the default value.
      window.console.log('parsing failed', ex);
    })
}

class Inputcontroller extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      houseValue: 500000,
      houseYearlyPriceIncrease: 3,
      longTermInvestmentReturnRate: 7,
      rentIncreaseRate: 1.5,
      downPayment: 10,
      intRate: parseFloat(this.props.interestRate[0].latestIntRate),
      fixExpenses: 1.75,
      oneTimeExpenses: 1.25,
      nbrAppartment: 1,
      averageRent:1900,
      neiborhoodName: '',
      neiborhoodCode: '',
      nbrYears: 25
    }
    this.neiborhoodSelected = this.neiborhoodSelected.bind(this);
    this.returnThisForCalculation = this.returnThisForCalculation.bind(this);
    this.customClickOnBootstrapButtons = this.customClickOnBootstrapButtons.bind(this);
    this.dropddownButtonSelectIntRate = this.dropddownButtonSelectIntRate.bind(this);
    this.getMedRentOfArea = this.getMedRentOfArea.bind(this);
  }
  changeValue (key, event) {
    // This set the value of the proper Key.
    this.setState({[key]: event.target.value});
  }
  changeNumberValue (key, event) {
    // This set the value of the proper Key.
    this.setState({[key]: parseFloat(event.target.value)});
  }
  neiborhoodSelected (returnedValue) {
    this.setState({
      neiborhoodName: returnedValue.name,
      neiborhoodCode: returnedValue.code
    });
  }
  returnThisForCalculation() {
    // Not sure how to setup a auto-refresh on every click. I tried and it was always sending the state -1 not the current one.
    this.props.extractParamForCalculation(this.state);
  }
  customClickOnBootstrapButtons(eventKey, event) {
    this.setState({nbrAppartment: parseFloat(event.target.value)});
  }
  dropddownButtonSelectIntRate(eventKey, event) {
    // This is stupid, we should have 1 function that do ALL, but the onChange={this.changeNumberValue.bind(this, 'X')} dosent work! It is stupid, I should be able to tell them at least what key to target.
    this.setState({intRate: parseFloat(event.target.value)});
  }
  getMedRentOfArea () {
    var updateThisState = function (neiborhoodRent) {
      this.setState({averageRent: neiborhoodRent});
    }
    updateThisState = updateThisState.bind(this);
    let neiborhoodCode = this.state.neiborhoodCode;
    getBuildingList(neiborhoodCode, updateThisState);
  }
  render() {
    const {buildingTypeList, neiborhoodlist, interestRate} = this.props;
    const {houseValue, downPayment, fixExpenses, intRate, nbrYears, averageRent, nbrAppartment, oneTimeExpenses, houseYearlyPriceIncrease, longTermInvestmentReturnRate, rentIncreaseRate} = this.state;
    const houseToolTip = (<Tooltip id='houseToolTip'>Expected % of price increase of the house per year.</Tooltip>);
    const investmentToolTip = (<Tooltip id='investmentToolTip'>Expected annual return on long term investment.</Tooltip>);
    const rentIncreaseToolTip = (<Tooltip id='rentIncreaseToolTip'>Expected annual increase of the rent.</Tooltip>);
    const youLiveSomewhere = (<Tooltip id='youLiveSomewhere'>If you dont live there you will pay rent somewhere else at the same time.</Tooltip>);
    const whereDoesItComeFrom = (<Tooltip id='whereDoesItComeFrom'>Data come from Quandl website. US only.</Tooltip>);
    return (
      <div>
        <div className='row'>
        <div className='col-sm-2'>Neiborhood:</div>
        <div className='col-sm-6'>
          <SelectNeiborhood className='form-control'neiborhoodlist={neiborhoodlist} neiborhoodSelected={this.neiborhoodSelected}/></div>
        <div className='col-sm-4'>{this.state.neiborhoodName} with #{this.state.neiborhoodCode}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
          <ButtonToolbar>
              <DropdownButton key="building" onSelect={this.customClickOnBootstrapButtons} title="Type of Building" id="dropdown-building">
                {buildingTypeList.map((building, i) => {
                    const { Title, Appartment} = building
                    return (<MenuItem eventKey={i} value={Appartment}>{Title}</MenuItem>)
                })}
              </DropdownButton>
            </ButtonToolbar>
          </div>
          <div className='col-sm-6'>
            <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon"># Rented</div>
                  <input type="number" className="form-control"
                    value={nbrAppartment}
                    onChange={this.changeNumberValue.bind(this, 'nbrAppartment')} />
                </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <OverlayTrigger placement="top" overlay={youLiveSomewhere}>
              <span>Include your appartment that you will live in as rented.</span>
            </OverlayTrigger>
          </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>
          <OverlayTrigger placement="top" overlay={whereDoesItComeFrom}>
            <Button onClick={this.getMedRentOfArea}>Estimate Rent</Button>
          </OverlayTrigger>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input type="number" className="form-control"
                value={averageRent}
                onChange={this.changeNumberValue.bind(this, 'averageRent')} />
            </div>
          </div>
        </div>
        <div className='col-sm-4'>
           <OverlayTrigger placement="top" overlay={rentIncreaseToolTip}>
            <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">% Rent increase</div>
                  <input type="number" className="form-control"
                    value={rentIncreaseRate}
                    onChange={this.changeNumberValue.bind(this, 'rentIncreaseRate')} />
                </div>
            </div>
          </OverlayTrigger>
        </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>House Value: </div>
        <div className='col-sm-3'>
          <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">$</div>
                <input type="number" className="form-control"
                  value={houseValue}
                  onChange={this.changeNumberValue.bind(this, 'houseValue')} />
              </div>
          </div>
        </div>
        <div className='col-sm-3 text-center'>{convertToCurrency(houseValue)} $ </div>
        <div className='col-sm-4'>
           <OverlayTrigger placement="top" overlay={houseToolTip}>
            <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">% Increase yearly</div>
                  <input type="number" className="form-control"
                    value={houseYearlyPriceIncrease}
                    onChange={this.changeNumberValue.bind(this, 'houseYearlyPriceIncrease')} />
                </div>
            </div>
          </OverlayTrigger>
        </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Down Payment: </div>
        <div className='col-sm-3'>
          <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">%</div>
                <input type="number" className="form-control"
                  value={downPayment}
                  onChange={this.changeNumberValue.bind(this, 'downPayment')} />
              </div>
          </div>
        </div>
        <div className='col-sm-3 text-center'>{convertToCurrency(houseValue*downPayment/100)} $ </div>
        <div className='col-sm-4'>
         <OverlayTrigger placement="top" overlay={investmentToolTip}>
          <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">% Long investment</div>
                <input type="number" className="form-control"
                  value={longTermInvestmentReturnRate}
                  onChange={this.changeNumberValue.bind(this, 'longTermInvestmentReturnRate')} />
              </div>
          </div>
        </OverlayTrigger>
        </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>
          <ButtonToolbar>
            <DropdownButton onSelect={this.dropddownButtonSelectIntRate} title="Interest Rate" id="dropdown-IntRate">
              {interestRate.map((intRate, i) => {
                  const { name, latestIntRate} = intRate
                  return (<MenuItem eventKey={i} value={latestIntRate}>{name} - {latestIntRate}</MenuItem>)
              })}
            </DropdownButton>
          </ButtonToolbar>
        </div>
        <div className='col-sm-6'>
          <div className="form-group">
              <div className="input-group">
                <div className="input-group-addon">%</div>
                <input type="number" className="form-control"
                  value={intRate}
                  onChange={this.changeNumberValue.bind(this, 'intRate')} />
              </div>
          </div>
        </div>
        <div className='col-sm-4'></div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Period</div>
        <div className='col-sm-6'>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">Years:</div>
              <input type="number" className="form-control"
                value={nbrYears}
                onChange={this.changeNumberValue.bind(this, 'nbrYears')} />
            </div>
          </div>
        </div>
        <div className='col-sm-4'></div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Fix expenses (taxes, repair, fee):</div>
        <div className='col-sm-3'>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">%</div>
              <input type="number" className="form-control"
                value={fixExpenses}
                onChange={this.changeNumberValue.bind(this, 'fixExpenses')} />
            </div>
          </div>
        </div>
        <div className='col-sm-3'>{parseFloat(fixExpenses).toFixed(2)} % or {convertToCurrency(houseValue*fixExpenses/100)}$/year</div>
        <div className='col-sm-4'></div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Welcome taxes & moving in</div>
        <div className='col-sm-3'>
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-addon">%</div>
              <input type="number" className="form-control"
                value={oneTimeExpenses}
                onChange={this.changeNumberValue.bind(this, 'oneTimeExpenses')} />
            </div>
          </div>
        </div>
        <div className='col-sm-3'>{parseFloat(oneTimeExpenses).toFixed(2)} % or {convertToCurrency(houseValue*oneTimeExpenses/100)}$</div>
        <div className='col-sm-4'></div>
        </div>

        <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-10'></div>
        </div>

        <div className='row text-center'>
          <div className='col-sm-12'>
            <button
              className='btn btn-lg btn-success'
              onClick={this.returnThisForCalculation}>
              Calculate
            </button>
          </div>
        </div>
      </div>
   );
  }
}

class SelectNeiborhood extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      suggestions: this.getSuggestions('')
    }
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }
  onChange(event, {newValue}) {
      this.setState({
        value: newValue
      });
  }
  onSuggestionsUpdateRequested({ value }) {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
  }
  onSuggestionSelected(event, {suggestion}) {
    // This is what pass the argument to the Higher level function.
    // Even if it is decoupled, the higher level function still receive only name and code.
    this.props.neiborhoodSelected({
      name: suggestion.Region,
      code: suggestion.Code
    });
  }
  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.neiborhoodlist.filter(neiborhood => regex.test(neiborhood.Region));
  }
  render() {
    const {value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type your neiborhood name',
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <Autosuggest suggestions={suggestions}
             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
             getSuggestionValue={getSuggestionValue}
             renderSuggestion={renderSuggestion}
             inputProps={inputProps}
             onSuggestionSelected={this.onSuggestionSelected} />
      </div>
   );
  }
}

export default Inputcontroller;
