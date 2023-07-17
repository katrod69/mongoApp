const router = require("express").Router();
const reactRoutes =  require('./reactRoutes');
const thoughtsRoutes =  require('./thoughtsRoutes');
const friendslistRoutes =  require('./friendslistRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/reacts', reactRoutes);
router.use('/friendslists', friendslistRoutes);

module.exports = router;