import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
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
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state, () => {
				if(this.state.isLogged) {
					console.log(this.state);
					this.getList();
				}
			})
		}
		
	}
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	clearState = () => {
		this.setState({
			isLogged:false,
			list:[],
			token:""
		}, () => {
			this.saveToStorage();
		})
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

	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						isLogged:true,
						token:data.token
					},() => {
						this.saveToStorage();
						this.getList();
					})
				}).catch(error => {
					console.log("Failed to parse JSON. Error:",error);
				})
			} else {
				console.log("Server responded with a status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});
	}	
	
	logout = () => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:this.state.token}
		}
		fetch("/logout",request).then(response => {
			if(response.ok) {
				this.clearState();
			} else {
				console.log("Server responded with status:",response.status);
				this.clearState();
			}
		}).catch(error => {
			console.log("Server responded with an error:",error);
		});
	}
	//Shopping api
	
	getList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:this.state.token}
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					}, () => {
						this.saveToStorage();
					}) 
				}).catch(error => {
					console.log("Parsing of JSON failed. Reason:",error);
				});
			} else {
				if(response.status === 403) {
					this.clearState();
					console.log("Session expired. Logging you out!");
				}
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
			headers:{"Content-type":"application/json",
					token:this.state.token},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.clearState();
					console.log("Session expired. Logging you out!");
				}
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
			headers:{"Content-type":"application/json",
					token:this.state.token}
		}
		fetch("/api/shopping/"+id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.clearState();
					console.log("Session expired. Logging you out!");
				}
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
			headers:{"Content-type":"application/json",
					token:this.state.token},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping/"+item.id,request).then(response => {
			if(response.ok) {
				this.getList();
			} else {
				if(response.status === 403) {
					this.clearState();
					console.log("Session expired. Logging you out!");
				}
				console.log("Server responded with a status:"+response.status);
			}
		}).catch(error => {
			console.log("Server responded with an error. Reason:",error);
		});		
	}
	
	
    render() {
		return (
			<div className="App">
				<Navbar isLogged={this.state.isLogged} logout={this.logout}/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => this.state.isLogged ?
						(<Redirect to="/list"/>) :
						(<LoginForm register={this.register} login={this.login}/>)
					}/>
					<Route path="/list" render={() => this.state.isLogged ?
						(<ShoppingList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.state.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>) :
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
    }
}

export default App;
