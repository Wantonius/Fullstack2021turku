import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[],
			isLogged:false,
			token:""
		}
	}
	
	componentDidMount() {
		this.getList();
	}
	
	//Login api
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success!");
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}
	
	//Shopping api
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					}) 
				}).catch(error => {
					console.log("Parsing of JSON failed. Reason:",error);
				});
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}
	
	addToList = (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}
	
	removeFromList = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});		
	}
	
	editItem = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item.id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});		
	}
	
	
    render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => 
						(<LoginForm register={this.register}/>)
					}/>
					<Route path="/list" render={() =>
						(<ShoppingList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>)
					}/>
					<Route path="/form" render={() => 
						(<ShoppingForm addToList={this.addToList}/>)
					}/>
				</Switch>
			</div>
		);
    }
}

export default App;
