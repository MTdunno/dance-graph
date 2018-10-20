import React, { Component } from 'react';

class EventList extends Component {
	
	componentDidMount(){
		fetch('https://quiet-reaches-88393.herokuapp.com/api/event/list').then( (results) => results.json(),(err) => {console.log(err);}).then( data => {
			let danceevents = data.results.map((danceevent) => {
				return (<div key={danceevent._id}>{danceevent.name}</div>)
			});
			this.setState({danceevents: danceevents});
			console.log({danceevents: danceevents});
		})
	}
	
	render() {
    return (<div id="container1">
	{this.state.danceevents}
	</div>);
	}
}

export default EventList;