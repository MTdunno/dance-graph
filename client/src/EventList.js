import React, { Component } from 'react';
import EventCard from './EventCard';

class EventList extends Component {
	
	constructor(props) {
		super(props);

		this.state = {danceevents: "DANCE EVENTS"};
	}
	
	componentDidMount(){
		console.log("start mount");
		fetch('https://quiet-reaches-88393.herokuapp.com/api/event/list').then(
		response => response.json()
		,(err) => {console.log(err);console.log("TEST3");}).then(
			data => {
				let danceevents = data.map(danceevent => {
					return (<EventCard danceevent={danceevent} />)
				});
				this.setState({danceevents: danceevents});
				console.log({danceevents: danceevents});
			}
		)
		
	}
	
	render() {
    return (<div class="container">
	{this.state.danceevents}
	</div>);
	}
}

export default EventList;