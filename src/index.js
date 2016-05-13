import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/Main';
import Errorpage from './components/Error/Errorpage';

// TODO: Initial Load of the data from the Node server like Building, interest rate, neighborhood code.
// Later we will call the API again with arguments to get the Average rentper neighborhood.

// TODO: Add a login? or we stay stateless with 1 page???
var fetchedData = {
	buildingTypeList: [{'Title':'House','Appartment':1,'RevenuPerApp':0},{'Title':'Duplex','Appartment':2,'RevenuPerApp':0},{'Title':'Triplex','Appartment':3,'RevenuPerApp':0},{'Title':'Fourplex','Appartment':4,'RevenuPerApp':0}],
	neiborhoodlist: [{'Region':'Paradise','State':'Las Vegas','Metro':'NV','County':'Las Vegas','City':'Clark','Code':'00001'},{'Region':'Upper West Side','State':'New York','Metro':'NY','County':'New York','City':'New York','Code':'00002'},{'Region':'South Los Angeles','State':'Los Angeles','Metro':'CA','County':'Los Angeles','City':'Los Angeles','Code':'00003'}],
	interestRate: [{'DB':'5US','name':'5/1-Year Adjustable Rate Mortgage Average in the United States','latestIntRate':2.78},{'DB':'15US','name':'15-Year Fixed Rate Mortgage Average in the United States','latestIntRate':2.81},{'DB':'30US','name':'30-Year Fixed Rate Mortgage Average in the United States','latestIntRate':3.57},{'DB':'WRMORTG','name':'30-Year Conventional Mortgage Rate','latestIntRate':3.61}]
};


// Render the main component into the dom
var loadedExternalRessources = function() {
	// Asynch Fetch, Request Or HTTP or jsonP Or whatever here asynch to get the external ressource from the server.
	// Trying Fetch Asynch, Request Ajax HTTP call, nothing work at the moment. 
	// This should load asynch the Building, and other components and set the base data.
	// buildingTypeList from http://192.168.99.100:49160/buildings/list.json
	// neiborhoodlist from http://192.168.99.100:49160/medRentOfArea/hood_codes.json
	// interestRate from http://192.168.99.100:49160/intrates
	// console.log('launching Promesses Here');
	// fetch('http://192.168.99.100:49160/buildings/list.json',{
	// 	method: 'get',
	// 	mode: 'no-cors'
	// })
	// .then(res => console.log('This Return no body:',res))
	// .then(data => console.log('data:',data))
	if (true) {
		// Should the catch be here? After and If I receive all initial data from the server then render the AppComponent?
		// Load the app
		ReactDOM.render(<App fetchedData={fetchedData}/>, document.getElementById('app'));
	} else {
		// Errorpage
		ReactDOM.render(<Errorpage />, document.getElementById('app'));
	}
};
loadedExternalRessources();