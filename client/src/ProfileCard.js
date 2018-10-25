import React, { Component } from 'react';


class ProfileCard extends Component {
	
	constructor(props) {
		super(props);

		this.state = {profile: "PROFILE"};
	}
	
	componentDidMount(){
		console.log("start mount");
		fetch('https://quiet-reaches-88393.herokuapp.com/profile/google').then(
		response => response.json()
		,(err) => {console.log(err);console.log("TEST3");}).then(
			data => {
				console.log(data);
				const profile =(
				<div class="card blue-grey darken-1">
					<div class="card-content white-text">
						<span class="card-title">{data.name}</span>
						<p><img src={data.photo}/></p>
					</div>
				</div>);
				this.setState({profile: profile});
			}
		)
		
	}
	
	render() {
    return (<div class="container">
	{this.state.profile}
	</div>);
	}
}

export default ProfileCard;