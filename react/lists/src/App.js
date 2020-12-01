import logo from './logo.svg';
import './App.css';
import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	addToList = (contact) => {
		this.setState((state) => ({
			list:state.list.concat(contact)
		}));
	}
	
	removeFromList = (index) => {
		let tempList = this.state.list;
		tempList.splice(index,1);
		this.setState({
			list:tempList
		})
	}
	
	render() {
		return (
			<div className="App">
				<ContactForm addToList={this.addToList}/>
				<ContactList list={this.state.list} removeFromList={this.removeFromList}/>
			</div>
		);
	}
}

export default App;
