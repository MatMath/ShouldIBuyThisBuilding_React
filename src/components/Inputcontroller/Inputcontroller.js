import React from 'react';
import Autosuggest from 'react-autosuggest';
require('./Inputcontroller.css');

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.City;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.City}, {suggestion.Code}</span>
  );
}
function convertToCurrency(valueToConvert) {
    // http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
    let returnNumber = parseFloat(valueToConvert);
    if (returnNumber) {
      return returnNumber.toFixed(0).replace(/./g, function(c, i, a) {
        return i && c !== '.' && ((a.length - i) % 3 === 0) ? ',' + c : c;
      });
    }
}

class Inputcontroller extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      houseValue: 500000,
      downPayment: 10,
      intRate: parseFloat(this.props.interestRate[0].latestIntRate),
      fixExpenses: 1.75,
      oneTimeExpenses: 1,
      nbrAppartment: 1,
      averageRent:0,
      neiborhoodName: '',
      neiborhoodCode: '',
      isDisabled: true,
      nbrYears: 25
    }
    this.neiborhoodSelected = this.neiborhoodSelected.bind(this);
    this.checkTheClass = this.checkTheClass.bind(this);
    this.returnThisForCalculation = this.returnThisForCalculation.bind(this);
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
    this.checkTheClass();
  }
  checkTheClass() {
    if (this.state.neiborhoodName && this.state.neiborhoodCode) {
      // This make the button to make the calculation possible.
      // Yes this could be automaticl but I play with even and states
      this.setState({isDisabled: false});
    }
  }
  returnThisForCalculation() {
    this.props.extractParamForCalculation(this.state);
  }
  render() {
    const {buildingTypeList, neiborhoodlist, interestRate} = this.props;
    const {houseValue, downPayment, fixExpenses, intRate, nbrYears, nbrAppartment, oneTimeExpenses, isDisabled} = this.state;
    return (
      <div>
        <div className='row'>
          <div className='col-sm-2'>Building Type: </div>
          <div className='col-sm-6'>
            <select onChange={this.changeNumberValue.bind(this, 'nbrAppartment')}>
              {buildingTypeList.map((building, i) => {
                  const { Title, Appartment} = building
                  return (<option key={i} value={Appartment}>{Title}</option>)
              })}
            </select>
          </div>
          <div className='col-sm-4'>App: {nbrAppartment}</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Neiborhood:</div>
        <div className='col-sm-6'><SelectNeiborhood neiborhoodlist={neiborhoodlist} neiborhoodSelected={this.neiborhoodSelected}/></div>
        <div className='col-sm-4'>{this.state.neiborhoodName} with #{this.state.neiborhoodCode}</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>House Value: </div>
        <div className='col-sm-6'>
          <input
            key='houseValue'
            type='number'
            defaultValue={houseValue}
            onChange={this.changeValue.bind(this, 'houseValue')}/>
        </div>
        <div className='col-sm-4'>{convertToCurrency(houseValue)} $ </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Down Payment %: </div>
        <div className='col-sm-6'>
          <input
            key='downPayment'
            type='number'
            defaultValue={downPayment}
            onChange={this.changeValue.bind(this, 'downPayment')}/>
        </div>
        <div className='col-sm-4'>{convertToCurrency(houseValue*downPayment/100)} $ </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Interest Rate %: </div>
        <div className='col-sm-6'>
          <select onChange={this.changeNumberValue.bind(this, 'intRate')}>
            {interestRate.map((intRate, i) => {
                const { name, latestIntRate} = intRate
                return (<option key={i} value={latestIntRate}>{name} - {latestIntRate}</option>)
            })}
          </select>
        </div>
        <div className='col-sm-4'><input
            key='intRate'
            type='number'
            value={intRate}
            onChange={this.changeNumberValue.bind(this, 'intRate')}/>
        </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Nbr of Years</div>
        <div className='col-sm-6'>
          <input
            key='nbrYears'
            type='number'
            defaultValue={nbrYears}
            onChange={this.changeValue.bind(this, 'nbrYears')}/></div>
        <div className='col-sm-4'>{nbrYears}</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'><button className='btn btn-info'>Estimate Rent per block</button></div>
        <div className='col-sm-6'>AutoSelectedValue Here</div>
        <div className='col-sm-4'>Final Value here</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Fix expenses % (taxes, repair, fee):</div>
        <div className='col-sm-6'>
          <input
            key='fixExpenses'
            type='number'
            defaultValue={fixExpenses}
            onChange={this.changeValue.bind(this, 'fixExpenses')}/></div>
        <div className='col-sm-4'>{parseFloat(fixExpenses).toFixed(2)} % or {convertToCurrency(houseValue*fixExpenses/100)}$/year</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Welcome taxes Calculation display</div>
        <div className='col-sm-6'>
          <input
            key='oneTimeExpenses'
            type='number'
            defaultValue={oneTimeExpenses}
            onChange={this.changeValue.bind(this, 'oneTimeExpenses')}/></div>
        <div className='col-sm-4'>{parseFloat(oneTimeExpenses).toFixed(2)} % or {convertToCurrency(houseValue*oneTimeExpenses/100)}$</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-10'></div>
        </div>

        <div className='row text-center'>
          <div className='col-sm-12'>
            <button
              className='btn btn-lg btn-success'
              disabled={isDisabled}
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
      name: suggestion.City,
      code: suggestion.Code
    });
  }
  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.neiborhoodlist.filter(neiborhood => regex.test(neiborhood.City));
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
