import React, { Component } from 'react';


class ProfileCard extends Component {
	
	constructor(props) {
		super(props);

		this.state = {profile: "PROFILE"};
	}
	
	componentDidMount(){
		console.log("start mount");
		
		fetch('https://quiet-reaches-88393.herokuapp.com/profile/google', { headers:{
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Headers': '*',
			'Accept': 'application/json, text/html'
		}, credentials: 'include', redirect: 'follow', method: 'GET'}).then(
		response => {
			console.log(response.text());
			console.log(response.body);
			console.log(response.json());
			console.log("TYPE");
			console.log(response.type);
			const stream = response.body
			var string = ''
			const chunks = [];
			
			stream.on("data", function (chunk) {
				console.log(chunk);
				chunks.push(chunk);
			});
            
			 // Send the buffer or you can put it into a var
			stream.on("end", function () {
				var x = Buffer.concat(chunks);
				console.log(x);
				const data = JSON.parse(x);
				response.write(typeof data);
				response.end();
			});
			
			
		}
		,(err) => {console.log(err);console.log("TEST3");}).then(
			data => {
				var stream = data;
				const chunks = [];

				stream.on("data", function (chunk) {
					console.log(chunk);
					chunks.push(chunk);
				});
				
				// Send the buffer or you can put it into a var
				stream.on("end", function () {
					var x = Buffer.concat(chunks);
					console.log(x);
					data = x;
				});
				
				
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
		).catch(error => {console.log("ERROR CASE"); console.log(error); console.log(error.response);});
		
	}
	
	render() {
    return (<div class="container">
	{this.state.profile}
	</div>);
	}
}

export default ProfileCard;