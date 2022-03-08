const User = require('../model/user')

// Create a user
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can't be empty!"})
        return
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    user.save()
    .then(data => res.redirect('/'))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while adding new user"
        })
    })
}

// Return all/one users/user
exports.find = (req, res) => {
    
    if(req.query.id){
        const id = req.query.id

        User.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send(`No user found with id ${id}`)
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send(err.message || "Some error ocurred while retriving user")
        })
    }else{
        User.find()
            .then(users => res.send(users))
            .catch(err => {
                res.status(500).send(err.message || "Some error ocurred while retriving users")
            })
    }
    
}

// Update user by ID
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data to update can't be empty!"})
    }

    const id = req.params.id
    User.findByIdAndUpdate(id, req.body)
    .then(data =>{
        if(!data){
            res.status(404).send("An error ocurred while updating user. Maybe this user doesn't exists")
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send(err.message || "Some error ocurred while updating user")
    })
}

// Delete user by ID
exports.delete = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Can't delete user with id: ${id}`})
        }else{
            res.send({message: "User deleted successfully"})
        }
        }
    )
    .catch(err => {
        res.status(500).send(err.message || "Some error ocurred while deleting user")
    })
}