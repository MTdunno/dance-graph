import React, { Component } from 'react';

class EventList extends Component {
	
	componentDidMount(){
		console.log("start mount");
//		fetch('https://quiet-reaches-88393.herokuapp.com/api/event/list').then(
//		(results) => {
//			console.log("TEST");
//			console.log(results);
//			console.log(results.json());
//			results.json();
//		}
//		,(err) => {console.log(err);console.log("TEST3");}).then(
//			data => {
//				console.log(data);
//				let danceevents = data.results.map((danceevent) => {
//					return (<div key={danceevent._id}>{danceevent.name}</div>)
//				});
//				this.setState({danceevents: danceevents});
//				console.log({danceevents: danceevents});
//			}
//		)
		this.setState({danceevents: "DANCE EVENTS"});
	}
	
	render() {
    return (<div id="container1">
		{this.state===undefined?"oops":this.state.danceevents}
	</div>);
	}
}

export default EventList;