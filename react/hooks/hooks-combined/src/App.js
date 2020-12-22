import logo from './logo.svg';
import './App.css';
import React,{useReducer,useState,useEffect} from 'react';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

const initialState = {
	list:[],
	loading:false,
	error:""
}

const listReducer = (state,action) => {
	let tempState = {};
	switch(action.type) {
		case "LOADING":
			tempState = {
				...state,
				error:"",
				loading:true
			}
			return tempState;
		case "LIST_LOADED": 
			tempState = {
				loading:false,
				error:"",
				list:action.list
			}
			return tempState;
		case "ERROR": 
			tempState = {
				...state,
				loading:false,
				error:action.error
			}
		default:
			return state;
	}
}

function App() {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{}
	})
	
	useEffect(() => {
		const fetchData = async () => {
			dispatch({type:"LOADING"});
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(response.ok) {
				if(urlRequest.request.method === "GET") {
					const data = await response.json();
					dispatch({type:"LIST_LOADED",list:data})
				} else {
					getList();
				}			
			} else {
				dispatch({
					type:"ERROR",
					error:"Server responded with a status "+response.status
				})
			}
		}
		
		fetchData();
	},[urlRequest]);
	
	useEffect(() => getList(),[]);
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			}
		})
	}
	
	const addToList = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(item)
			}
		})
	}
	
	const removeFromList = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			}
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
