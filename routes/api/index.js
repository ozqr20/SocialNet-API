const router = require('express').Router;
const thoughtsRoute = require('./thoughtRoute');
const usersRoute = require('./userRoute');

router.use('./thoughts', thoughtsRoute);
router.use('./users', usersRoute);

moduel.exports = router;