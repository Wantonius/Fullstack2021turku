import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = state.id;
		let tempList = state.list.concat(item);
		setState({
			list:tempList,
			id:item.id+1
		})
	}
	
	const removeFromList = (id) => {
		let tempList = state.list.filter(item => item.id !== id);
		setState({
			...state,
			list:tempList
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={state.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
