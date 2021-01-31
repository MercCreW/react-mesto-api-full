const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfileUser, updateAvatarUser, getCurrentUser,
} = require('../controllers/user.js');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
