const router = require('express').Router();
const {
    getReact,
    getSingleReact,
    createReact,
} = require('../../controllers/reactController');

// /api/react
router.route('/').get(getReact).post(createReact);

//  /api/react/:reactId
router.route('/:reactId').get(getSingleReact);

module.exports = router;