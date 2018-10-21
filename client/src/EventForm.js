import React, { Component } from 'react';

class EventForm extends Component {
	
	constructor(props) {
		super(props);
		
		

		this.state = {};
	}
	
	handleSubmit(item){
		fetch('https://quiet-reaches-88393.herokuapp.com/api/event/create',{
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {"Content-Type": "application/json"}
		})
		.then(function(response){
			console.log(response);
			return response.json()
		}).then(function(body){
			console.log(body);
		});
	}
	
	handleStateChange(item){
		
		this.setState({[item.target.name]:item.target.value});
		
	}
	
	render() {
    return (
		<form onSubmit={this.state.handleSubmit}>
			<div class="card blue-grey darken-1">
				<div class="card-content white-text">
					<span class="card-title"><input name="name" value={this.state.name} /></span>
					<p><input name="description" value={this.state.description} /></p>
				</div>
				<div class="card-action">
					<input type="submit" value="Submit"/>
				</div>
			</div>
		</form>
		);
	}
}

export default EventForm;