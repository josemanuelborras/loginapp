'use strict'

const index = (req, res) => {

    // let id = req.params.id;

    // if(id != req.user.sub) return res.status(500).json({ message: "Permisison deniend"});
    console.log(req.user.sub);
    return res.status(200).json({message: "Index Page"})
}

module.exports = {
    index
}