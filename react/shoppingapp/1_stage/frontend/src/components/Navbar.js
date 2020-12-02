import React from 'react';
import {List} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
	
	render() {
		let navStyle = {
			height:80,
			backgroundColor:"lightblue"
		}
		return (
			<div style={navStyle}>
				<List>
					<List.Item><Link to="/">Shopping List</Link></List.Item>
					<List.Item><Link to="/form">Add to list</Link></List.Item>
				</List>
			</div>
		)
	}
}