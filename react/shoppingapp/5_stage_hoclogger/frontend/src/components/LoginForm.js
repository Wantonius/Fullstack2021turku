import React from 'react';
import {Form,Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {register,login} from '../actions/loginActions';
import HocLogger from '../logger/hoclogger/HocLogger';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username:"",
			password:""
		}
	}

	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let user = {
			username:this.state.username,
			password:this.state.password
		}
		if(event.target.name === "register") {
			this.props.hoclog(this.props.loglevels.LOG_INFO,"LoginForm onSubmit","Registering user:"+this.state.username)
			this.props.dispatch(register(user));
		} else {
			this.props.hoclog(this.props.loglevels.LOG_INFO,"LoginForm onSubmit","Logging user:"+this.state.username)
			this.props.dispatch(login(user));
		}
		
	}
	
	render() {
		return (
			<div style={{width:500, margin:"auto"}}>
				<Form>
					<Form.Field>
						<label htmlFor="username">Username:</label>
						<input type="text"	
								name="username"
								onChange={this.onChange}
								value={this.state.username}/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password:</label>
						<input type="password"	
								name="password"
								onChange={this.onChange}
								value={this.state.password}/>
					</Form.Field>
					<Button onClick={this.onSubmit} name="register">Register</Button>
					<Button onClick={this.onSubmit} name="login">Login</Button>
				</Form>
			</div>
		)
	}
}

export default HocLogger(connect()(LoginForm));