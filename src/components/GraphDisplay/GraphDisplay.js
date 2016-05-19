import React from 'react';

class GraphDisplay extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading:true
		}
	}
	render() {

		return (
		<div>
			<br/>
			<div className='row'>
				<div className='col-sm-2 bg-info'>Lets Do This!!!</div>
			</div>
		</div>
		);
	}
}

export default GraphDisplay;