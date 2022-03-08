const axios = require('axios')

exports.homeRoute = (req, res) => {
    axios.get(process.env.GET_REQUEST_URL)
        .then(response =>{
            res.render('index', {usersList: response.data})
        })
        .catch(err => {
            res.send(err)
        })
}

exports.addUser = (req, res) => {
    res.render('add_user')
}

exports.updateUser = (req, res) => {
    axios.get(process.env.GET_REQUEST_URL, {params: {id: req.query.id}})
        .then(response =>{
            res.render('update_user', {user: response.data})
        })
        .catch(err => {
            res.send(err)
        })
}