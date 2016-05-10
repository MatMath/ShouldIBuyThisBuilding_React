import React from 'react';

class Inputcontroller extends React.Component {
  render() {
    return (
      <div>
        <hr />
        <div>Selec Building Type - > Dropdown from a fetched list</div>
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
