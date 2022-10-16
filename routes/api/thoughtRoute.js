const router = require('express').Router();

const{
    getEveryThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getEveryThought)
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:userId').post(createThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;