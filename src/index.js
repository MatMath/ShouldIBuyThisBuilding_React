import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main/Main';
import Errorpage from './components/Error/Errorpage';

// TODO: Initial Load of the data from the Node server like Building, interest rate, neighborhood code.
// Later we will call the API again with arguments to get the Average rentper neighborhood.

// This will be the fallback data if the server is down
var fetchedData = {
	buildingTypeList: [{'Title':'House','Appartment':1,'RevenuPerApp':0},{'Title':'Duplex','Appartment':2,'RevenuPerApp':0},{'Title':'Triplex','Appartment':3,'RevenuPerApp':0},{'Title':'Fourplex','Appartment':4,'RevenuPerApp':0}],
	neiborhoodlist: [{'Region':'Paradise','State':'Las Vegas','Metro':'NV','County':'Las Vegas','City':'Clark','Code':'00001'},{'Region':'Upper West Side','State':'New York','Metro':'NY','County':'New York','City':'New York','Code':'00002'},{'Region':'South Los Angeles','State':'Los Angeles','Metro':'CA','County':'Los Angeles','City':'Los Angeles','Code':'00003'}],
	interestRate: [{'DB':'5US','name':'5/1-Year Adjustable Rate Mortgage Average in the United States','latestIntRate':2.78},{'DB':'15US','name':'15-Year Fixed Rate Mortgage Average in the United States','latestIntRate':2.81},{'DB':'30US','name':'30-Year Fixed Rate Mortgage Average in the United States','latestIntRate':3.57},{'DB':'WRMORTG','name':'30-Year Conventional Mortgage Rate','latestIntRate':3.61}]
};
const HTTP_SERVER = 'http://52.23.118.16';

// Render the main component into the dom
var loadedExternalRessources = function() {
	// Asynch Fetch, Request Or HTTP or jsonP Or whatever here asynch to get the external ressource from the server.
	// Trying Fetch Asynch, Request Ajax HTTP call, nothing work at the moment.
	// This should load asynch the Building, and other components and set the base data.
	// buildingTypeList from SERVER/buildings/list.json
	// neiborhoodlist from SERVER/medRentOfArea/hood_codes.json
	// interestRate from SERVER/intrates

	// Not sure how to use Fetch with multiple call in sequence so I tricked it for now.

	function getBuildingList() {
		fetch(`${HTTP_SERVER}/buildings/list.json`,{
			method: 'GET',
			ContentType: 'json'
		})
		.then(function(res) {
			// This return the header call of the function, not the data.
			return res.json();
		})
		.then(function(data){
			// The data is here:
			fetchedData.buildingTypeList = data;
			window.console.log('Got the Building Type');
			getNeiborhoodCode();
		})
		.catch(function(ex) {
			// Fail to fetch so keep using the default value.
	    	window.console.log('parsing failed', ex);
	    	getNeiborhoodCode();
	  	})
	}

	function getNeiborhoodCode () {
		fetch(`${HTTP_SERVER}/medRentOfArea/hood_codes.json`,{
			method: 'GET',
			ContentType: 'json'
		})
		.then(function(res) {
			// This return the header call of the function, not the data.
			return res.json();
		})
		.then(function(data){
			// The data is here:
			fetchedData.neiborhoodlist = data;
			window.console.log('Got the neiborhood list');
			getInterestRate();
		})
		.catch(function(ex) {
			// Fail to fetch so keep using the default value.
	    	window.console.log('parsing failed', ex);
	    	getInterestRate();
	  	})
	}

	function getInterestRate () {
		fetch(`${HTTP_SERVER}/intrates`,{
			method: 'GET',
			ContentType: 'json'
		})
		.then(function(res) {
			// This return the header call of the function, not the data.
			return res.json();
		})
		.then(function(data){
			// The data is here:
			fetchedData.interestRate = data;
			window.console.log('Got the Interest Rate');
			renderTheView();
		})
		.catch(function(ex) {
			// Fail to fetch so keep using the default value.
	    	window.console.log('parsing failed', ex);
	    	renderTheView();
	  	})
	}

	function renderTheView() {
		if (true) {
			// Should the catch be here? After and If I receive all initial data from the server then render the AppComponent?
			// Load the app
			ReactDOM.render(<App fetchedData={fetchedData} HTTP_SERVER={HTTP_SERVER}/>, document.getElementById('app'));
		} else {
			// Errorpage
			ReactDOM.render(<Errorpage />, document.getElementById('app'));
		}
	}

	getBuildingList();
};
loadedExternalRessources();