import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {connect} from 'react-redux';
import {getList,removeFromList,editItem} from '../actions/shoppingActions';
import HocLogger from '../logger/hoclogger/HocLogger';

class ShoppingList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			search:""
		}
	}
	
	searchByType = (event) => {
		this.props.dispatch(getList(this.props.token,this.state.search));
		this.setState({
			search:""
		})
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}
	
	handleRemoveButton = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i]._id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
			}
		}
	}

	handleEditButton = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(id === this.props.list[i]._id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				})
			}
		}
	}	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	removeFromList = (id) => {
		this.props.hoclog(this.props.loglevels.LOG_INFO,"ShoppingList removefromList","Removing item of id:"+id);
		this.props.dispatch(removeFromList(id,this.props.token));
		this.cancel();
	}
	
	editItem = (item) => {
		this.props.hoclog(this.props.loglevels.LOG_INFO,"ShoppingList editItem","Editing item of id:"+item.id);
		this.props.dispatch(editItem(item,this.props.token));
		this.cancel();
	}

	render() {
		let items = this.props.list.map((item,index) => {
			if(index === this.state.removeIndex) {
				return (<RemoveRow item={item} key={item._id} removeFromList={this.removeFromList} cancel={this.cancel}/>)
			}
			if(index === this.state.editIndex) {
				return (<EditRow item={item} key={item._id} editItem={this.editItem} cancel={this.cancel}/>)
			}
			
			return (	
				<Row item={item} key={item._id} handleRemoveButton={this.handleRemoveButton}
				handleEditButton={this.handleEditButton}/>
			)
		})
		return(
		<div>
			<label htmlFor="search">Search by type:</label>
			<input type="text"
					name="search"
					onChange={this.onChange}
					value={this.state.search}/>
			<Button onClick={this.searchByType} style={{marginLeft:10}}>Search</Button>
			<Table striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Item type</Table.HeaderCell>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Remove</Table.HeaderCell>
						<Table.HeaderCell>Edit</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{items}
				</Table.Body>
			</Table>
		</div>
		)		
	}
}

const mapStateToProps = (state) => {
	return {
		token:state.login.token,
		list:state.shopping.list
	}
}

export default HocLogger(connect(mapStateToProps)(ShoppingList));