

//Simple version, without validation or sanitation
exports.google = (req, res) => {
  const user = { 
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, 'sz=250')
  }
  res.send(user);
}



