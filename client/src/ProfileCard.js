import React, { Component } from 'react';


class ProfileCard extends Component {
	
	constructor(props) {
		super(props);

		this.state = {profile: "PROFILE"};
	}
	
	componentDidMount(){
		console.log("start mount");
		fetch('https://quiet-reaches-88393.herokuapp.com/profile/google', {mode: 'no-cors'}).then(
		response => response.json()
		,(err) => {console.log(err);console.log("TEST3");}).then(
			data => {
				console.log(data);
				let profile = "PROOFILE";
				if(data){
					profile =(
					<div class="card blue-grey darken-1">
						<div class="card-content white-text">
							<span class="card-title">{data.name}</span>
							<p><img class="responsive-img circle" src={data.photo}/></p>
						</div>
					</div>);
				}
				this.setState({profile: profile});
			}, err => {console.log(err); console.log(response.text()}
		)
		
	}
	
	render() {
    return (<div class="container">
	{this.state.profile}
	</div>);
	}
}

export default ProfileCard;