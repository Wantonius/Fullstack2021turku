import React from 'react';
import {withRouter} from 'react-router-dom';

class About extends React.Component {

	render() {
		return(
			<div>
				<h2>This is about page</h2>
				<button onClick={() => this.props.history.push("/secret")}>Go to secret page</button>
			</div>
		)
	}
}

export default withRouter(About);