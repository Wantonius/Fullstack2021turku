import React from 'react';
import {List,Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Navbar extends React.Component {
	
	render() {
		let header = <Header>Shopping App</Header>
		if(this.props.loading) {
			header = <Header>Loading ...</Header>
		}
		if(this.props.error) {
			header = <Header>{this.props.error}</Header>
		}
		let navStyle = {
			height:100,
			backgroundColor:"lightblue"
		}
		if(this.props.isLogged) {
			return (
				<div style={navStyle}>
					{header}
					<List>
						<List.Item><Link to="/list">Shopping List</Link></List.Item>
						<List.Item><Link to="/form">Add to list</Link></List.Item>
						<List.Item><Link to="/" onClick={() => this.props.logout()}>Logout</Link></List.Item>
					</List>
				</div>
			)
		} else {
			return (
				<div style={navStyle}>
					{header}
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	let error = "";
	if(state.error) {
		error = state.error
	}
	return {
		isLogged:state.isLogged,
		token:state.token,
		loading:state.loading,
		error:error
	}
}

export default connect(mapStateToProps)(Navbar);