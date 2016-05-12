import React from 'react';

class Inputcontroller extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading:false
    }
  }
  render() {
    const {buildingTypeList, neiborhoodlist, interestRate} = this.props;
    var buildingOption = ['Item1', 'Item2', 'Item3'];
    return (
      <div>
        <hr />
        <div>
          Select Building Type: 
          <select>
            {buildingTypeList.map((building, i) => {
                const { Title, Appartment} = building
                return (<option value={Appartment}>{Title}</option>)
            })}
          </select>
          {/* 
            This is to find the number of appartment in the building
            TODO: OnClick add the value somewhere???
          */}
        </div>
        <div>Selec Building Neiborhood - > Autocomplete from a fetched list</div>
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
