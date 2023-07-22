const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  deleteThought,
  updateThought,
  createReact,
  deleteReact,
} = require('../../controllers/thoughtsController');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);


router.route("/:thoughtId/react")
.post(createReact);
router.route('/:thoughtId/react/:reactId')
.delete(deleteReact)
module.exports = router;
