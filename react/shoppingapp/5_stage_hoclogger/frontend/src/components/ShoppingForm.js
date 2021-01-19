import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {addToList} from '../actions/shoppingActions';
import HocLogger from '../logger/hoclogger/HocLogger';

class ShoppingForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			type:"",
			count:0,
			price:0
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.hoclog(this.props.loglevels.LOG_INFO,"ShoppingForm onSubmit","Adding an new shopping item of type:"+this.state.type);
		this.props.dispatch(addToList(item,this.props.token));
		this.setState({
			type:"",
			count:0,
			price:0
		})
	}
	
	render() {
		return(
			<div style={{width:500,margin:"auto"}}>
				<Form onSubmit={this.onSubmit}>
					<Form.Field>
						<label htmlFor="type">Item type:</label>
						<input type="text"
								name="type"
								onChange={this.onChange}
								value={this.state.type}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="count">Count:</label>
						<input type="number"
								name="count"
								onChange={this.onChange}
								value={this.state.count}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="price">Price:</label>
						<input type="number"
								step="0.01"
								name="price"
								onChange={this.onChange}
								value={this.state.price}/>
					</Form.Field>
					<Button type="submit">Add</Button>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token
	}
}

export default HocLogger(connect(mapStateToProps)(ShoppingForm));