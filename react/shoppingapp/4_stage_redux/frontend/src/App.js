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
	



	//Shopping api
	

	
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
		token:state.login.token,
		isLogged:state.login.isLogged
	}
}

export default connect(mapStateToProps)(App);
