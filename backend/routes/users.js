const router = require('express').Router();
const { validateAvatar, validateUserUpdate, validateId } = require('../middlewares/validateReq');
const {
  getUsers, editAvatar, updateProfile, getUserById, checkToken
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', checkToken);
router.get('/:_id', validateId, getUserById);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateAvatar, editAvatar);

module.exports = router;
