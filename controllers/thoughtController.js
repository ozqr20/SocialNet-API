const { Thought, User } = require('../models');

const thoughtController = {
    // new thought
    createThought({ params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {id: params.userId},
                {$push: {Thought: _id}},
                {new: true})
        })
        .then(networkDB => {
            if(!networkDB) {
                res.status(404).json({message: 'No thougts with this id!'})
                    return;
            }
            res.json(networkDB)
        })
        .catch(err => res.json(err));
    },
    // get all thoughts by id
    getEveryThought(req, res) {
        Thought.find({})
        .populate({path: 'reactions', select: '__v'})
        .select('-__v')
        .then(networkDB => res.json(networkDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(networkDB)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // update Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body,{ new: true, runValidators: true })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(networkDB => {
            if (!networkDB) {
                res.status(404).json({ message: 'No thought with this id!' })
                return;
            }
            res.json(networkDB);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete thought 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No thought with this id!' })
                    return;
                }
                res.json(networkDB);
            })
            .catch(err => res.status(400).json(err));
    },

    //add a reaction 
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('__v')
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No thought with this id!' })
                    return;
                }
                res.json(networkDB);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId}}},
            { new: true })
            .then(networkDB => {
                if (!networkDB) {
                    res.status(404).json({ message: 'No thought with this id!' })
                    return;
                }
                res.json(networkDB);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;