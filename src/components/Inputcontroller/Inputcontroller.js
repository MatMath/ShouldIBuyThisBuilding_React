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
      loading:false,
      houseValue: 200000,
      downPayment: 10,
      intRate: '',
      fixExpenses: 1.75
    }
  }
  changeHouseValue (event) {
    // This set the Mortgage value
    this.setState({houseValue: event.target.value});
  }
  changeIntRate (event) {
    // This Set the Interest Rate
    this.setState({intRate: event.target.value});
  }
  changeFixExpenses (event) {
    // This Set the Interest Rate
    this.setState({fixExpenses: event.target.value});
  }
  changedownPayment (event) {
    // This Set the Interest Rate
    this.setState({downPayment: event.target.value});
  }
  render() {
    const {buildingTypeList, neiborhoodlist, interestRate} = this.props;
    const {houseValue, downPayment, fixExpenses} = this.state;
    return (
      <div className='container striped'>
        <div className='row'>
          <div className='col-sm-2'>Building Type: </div>
          <div className='col-sm-6'>
            <select>
              {buildingTypeList.map((building, i) => {
                  const { Title, Appartment} = building
                  return (<option key={i} value={Appartment}>{Title}</option>)
              })}
            </select>
          </div>
          <div className='col-sm-4'>Selection of the building</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Neiborhood:</div>
        <div className='col-sm-6'><SelectNeiborhood neiborhoodlist={neiborhoodlist} /></div>
        <div className='col-sm-4'>Result is: How to extract it???</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>House Value: </div>
        <div className='col-sm-6'>
          <input
            type='number'
            defaultValue={houseValue}
            onChange={this.changeHouseValue.bind(this)}/>
        </div>
        <div className='col-sm-4'>{convertToCurrency(houseValue)} $ </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Down Payment %: </div>
        <div className='col-sm-6'>
          <input
            type='number'
            defaultValue={downPayment}
            onChange={this.changedownPayment.bind(this)}/>
        </div>
        <div className='col-sm-4'>{convertToCurrency(houseValue*downPayment/100)} $ </div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Interest Rate %: </div>
        <div className='col-sm-6'>
          <select onChange={this.changeIntRate.bind(this)}>
            {interestRate.map((intRate, i) => {
                const { name, latestIntRate} = intRate
                return (<option key={i} value={latestIntRate}>{name} - {latestIntRate}</option>)
            })}
          </select>
        </div>
        <div className='col-sm-4'>{this.state.intRate}</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'><button className='btn btn-info'>Estimate Rent per block</button></div>
        <div className='col-sm-6'>AutoSelectedValue Here</div>
        <div className='col-sm-4'>Final Value here</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Fix expenses % (taxes):</div>
        <div className='col-sm-6'>
          <input
            type='number'
            defaultValue={fixExpenses}
            onChange={this.changeFixExpenses.bind(this)}/></div>
        <div className='col-sm-4'>{fixExpenses} % or {convertToCurrency(houseValue*fixExpenses/100)}$/year</div>
        </div>

        <div className='row'>
        <div className='col-sm-2'>Welcome taxes Calculation display</div>
        <div className='col-sm-10'></div>
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
    window.console.log('Autosuggest was selected on code:', suggestion.Code);
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
             Result is: {value}
      </div>
   );
  }
}

export default Inputcontroller;
