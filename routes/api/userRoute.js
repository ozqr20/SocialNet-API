const router = require('express').Router();

const{
    getEveryUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getEveryUser).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:id/friends/:friendsId').post(addFriend).delete(deleteFriend);

module.exports = router;