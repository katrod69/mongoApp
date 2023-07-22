const router = require('express').Router();
const {
  getSingleUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:Userid/Friends/:Friendsid')
.post(addFriend);

router.route('/:Userid/Friends/:Friendsid')
.delete(deleteFriend);
module.exports = router;