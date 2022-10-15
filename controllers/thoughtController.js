const { Thoughts, User } = require('../models');

const thoughtController = {
    // new thought
    createThought({ params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {id: params.userId},
                {$push: {thoughts: _id}},
                {new: true})
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thougts with this id!'})
                    return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },
    
}