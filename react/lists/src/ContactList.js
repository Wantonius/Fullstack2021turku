import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class ContactList extends React.Component {
	
	render() {
		let contacts = this.props.list.map((contact,index) => {
			return (
				<Table.Row key={index}>
					<Table.Cell>{contact.firstname}</Table.Cell>
					<Table.Cell>{contact.lastname}</Table.Cell>
					<Table.Cell>{contact.email}</Table.Cell>
					<Table.Cell>{contact.phone}</Table.Cell>
				</Table.Row>
			)
		})	
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>First Name</Table.HeaderCell>
						<Table.HeaderCell>Last Name</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
						<Table.HeaderCell>Phone</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{contacts}
				</Table.Body>
			</Table>
		)
	}
}