// From what is display and inputed before, this is to display the summary of the calculated data.
import React from 'react';
require('./GenericResults.css');

// Alternative for CSS would be to use withStyles but that add a library.
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// and to export withStyles(GenericResults, cssImportedFile)

class GenericResults extends React.Component {
	render() {
	    return (
	      <div>
	      	<hr />
	        <span className='makeItRed'>Mortgage total</span>
	        <span>Total rent income</span>
	        <span>Total safety</span>
	        <span>Total spending</span>
	      </div>
	   );
	}
}

export default GenericResults;
