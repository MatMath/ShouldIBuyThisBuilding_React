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

class Inputcontroller extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading:false,
      value: '',
      suggestions: this.getSuggestions('')
    }
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }
  onChange(event, { newValue, method }) {
      this.setState({
        value: newValue
      });
  }
  onSuggestionsUpdateRequested({ value }) {
      this.setState({
        suggestions: this.getSuggestions(value)
      });
  }
  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
    console.log("Autosuggest was selected on code:", suggestion.Code);
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
    const {buildingTypeList, neiborhoodlist, interestRate} = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Type your neiborhood name",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <hr />
        <div>
          Select Building Type: 
          <select>
            {buildingTypeList.map((building, i) => {
                const { Title, Appartment} = building
                return (<option key={Title} value={Appartment}>{Title}</option>)
            })}
          </select>
          {/* 
            This is to find the number of appartment in the building
            TODO: OnClick add the value somewhere???
          */}
        </div>
        <div>Selec Building Neiborhood
            <Autosuggest suggestions={suggestions}
                 onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                 getSuggestionValue={getSuggestionValue}
                 renderSuggestion={renderSuggestion}
                 inputProps={inputProps}
                 onSuggestionSelected={this.onSuggestionSelected} />
                 Result is: {value}
        </div>
        <div>Building Value + Down Payment OR value -> Extract value out of the Building down back into the Calculation</div>
        <div>Selec Mortgage % value</div>
        <div><button>Estimate Rent per block</button> rent: (Value Here)</div>
        <div>Fix expenses % taxes</div>
        <div>Welcome taxes Calculation display</div>
      </div>
   );
  }
}

export default Inputcontroller;
