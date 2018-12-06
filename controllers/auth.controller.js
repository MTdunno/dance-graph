

//Simple version, without validation or sanitation
exports.google = (req, res) => {
	if(req.user){
  const user = { 
    name: req.user.displayName,
    photo: req.user.image
  }
  res.json(user);
	} else {
		res.json({name: "error"});
	}
}



