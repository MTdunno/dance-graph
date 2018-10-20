import React, { Component } from 'react';

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
				console.log(data);
				let danceevents = data.map(danceevent => {
					return (<div key={danceevent._id}>{danceevent.name}</div>)
				});
				this.setState({danceevents: danceevents});
				console.log({danceevents: danceevents});
			}
		)
		
	}
	
	render() {
    return (<div id="container1">
		"TEST THINGS"
	</div>);
	}
}

export default EventList;