import React from 'react';
import {connect} from 'react-redux';

class ContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstname:"",
			lastname:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let contact = {
			firstname:this.state.firstname,
			lastname:this.state.lastname
		}
		console.log("ContactForm: onSubmit, dispatch ADD_TO_LIST");
		this.props.dispatch({
			type:"ADD_TO_LIST",
			contact:contact
		})
	}
	
	render() {
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="firstname">First Name</label>
				<input type="text"
						name="firstname"
						onChange={this.onChange}
						value={this.state.firstname}/>
				<br/>
				<label htmlFor="lastname">Last Name</label>
				<input type="text"
						name="lastname"
						onChange={this.onChange}
						value={this.state.lastname}/>
				<br/>
				<button type="submit">Add</button>
			</form>
		)
	}
}

export default connect()(ContactForm);