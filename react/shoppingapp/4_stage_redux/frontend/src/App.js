import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {connect} from 'react-redux';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state, () => {
				if(this.props.isLogged) {
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
	
	getList = (query) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					token:this.props.token}
		}
		let url = "/api/shopping";
		if(query) {
			url = url+"?type="+query
		}
		fetch(url,request).then(response => {
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
					token:this.props.token},
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
					token:this.props.token}
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
					token:this.props.token},
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
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={() => this.props.isLogged ?
						(<Redirect to="/list"/>) :
						(<LoginForm />)
					}/>
					<Route path="/list" render={() => this.props.isLogged ?
						(<ShoppingList list={this.state.list}
							removeFromList={this.removeFromList}
							editItem={this.editItem}
							getList={this.getList}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/form" render={() => this.props.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>) :
						(<Redirect to="/"/>)
					}/>
				</Switch>
			</div>
		);
    }
}

const mapStateToProps = (state) => {
	return {
		token:state.token,
		isLogged:state.isLogged
	}
}

export default connect(mapStateToProps)(App);
