import React, { Component } from 'react';

class EventCard extends Component {
	
	constructor(props) {
		super(props);

		this.state = this.props.danceevent;
	}
	
	render() {
    return (
	<div class="card blue-grey darken-1">
	<span class="card-title">{this.state.name}</span>
	<p>{this.state.description}</p>
	</div>);
	}
}

export default EventCard;