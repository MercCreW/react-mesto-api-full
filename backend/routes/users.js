const router = require('express').Router();
const {
  getUsers, getUserById, createUser, updateProfileUser, updateAvatarUser, getCurrentUser,
} = require('../controllers/user.js');
const { validateId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', validateId, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/https?:\/\/\S+\.\S+/m),
  }),
}), updateAvatarUser);

module.exports = router;
