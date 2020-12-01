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
	
	render() {
		return (
			<div className="App">
				<ContactForm addToList={this.addToList}/>
				<ContactList list={this.state.list}/>
			</div>
		);
	}
}

export default App;
