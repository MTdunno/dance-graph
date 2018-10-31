import React, { Component } from 'react';


class ProfileCard extends Component {
	
	constructor(props) {
		super(props);

		this.state = {profile: "PROFILE"};
	}
	
	componentDidMount(){
		console.log("start mount");
		fetch('https://quiet-reaches-88393.herokuapp.com/profile/google', {mode: 'no-cors'}).then(
		response => {
			console.log(response);
			console.log(response.body);
			var stream = response.body
			var string = ''
			const chunks = [];
			
			if(stream){

				stream.on("data", function (chunk) {
					console.log(chunk);
					chunks.push(chunk);
				});
				
				// Send the buffer or you can put it into a var
				stream.on("end", function () {
					var x = Buffer.concat(chunks);
					console.log(x);
					response.send(x);
				});
				
			}else{
				throw new Error();
			}
		}
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
			}
		).catch(error => {console.log("ERROR CASE"); console.log(error.response);});
		
	}
	
	render() {
    return (<div class="container">
	{this.state.profile}
	</div>);
	}
}

export default ProfileCard;