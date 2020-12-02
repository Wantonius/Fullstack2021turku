import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import Navbar from './components/Navbar';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	componentDidMount() {
		this.getList();
	}
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					}) 
				}).catch(error => {
					console.log("Parsing of JSON failed. Reason:",error);
				});
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}
	
    render() {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() =>
						(<ShoppingList list={this.state.list}/>)
					}/>
					<Route path="/form" render={() => 
						(<ShoppingForm/>)
					}/>
				</Switch>
			</div>
		);
    }
}

export default App;
