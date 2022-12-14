const { User } = require('../models');

const userController = {
    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(networkDB => res.json(networkDB))
        .catch(err => res.status(400).json(err));
    },

    // get user
    getEveryUser(req,res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(networkDB => res.json(networkDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get user by id
    getUserById({ params }, res){
        User.findOne({_id: params.id})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(networkDB => {
            if(!networkDB){
                res.status(404).json({message: 'No user with this id!'});
                return;
            }
            res.json(networkDB)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    
    // update user
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.id}, 
             {$set: req.body},
             {new: true, runValidators: true}
             )
             .then(networkDB => {
                if(!networkDB) {
                     res.status(404).json({ message: 'No user with this id!' })
                     return;
                 }
                 res.json(networkDB);
             })
             .catch(err => res.status(400).json(err));
    },

    //delete user 
    deleteUser({ params }, res){
        User.findOneAndDelete({_id: params.id})
        .then(networkDB => {
            if(!networkDB) {
                 res.status(404).json({ message: 'No user with this id!' })
                 return;
             }
             res.json(networkDB);
         })
         .catch(err => res.status(400).json(err));
    },

    //update user friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$push: { friends: params.friendId }},
            {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('__v')
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(networkDB);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a friend
    deleteFriend({ params }, res){
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: { friends: params.friendId }},
            {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('__v')
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No user with this id!' })
                    return;
                }
                res.json(networkDB);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;