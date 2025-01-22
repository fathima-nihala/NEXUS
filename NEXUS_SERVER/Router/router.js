
const router = require('express').Router();
const { register, Login } = require('../Controller/userController');
const { webRegister, webLogin, getAllUsers, updateUser } = require('../Controller/webUserController');

router.route('/reg').post(register);
router.route('/login').post(Login);

router.route('/web_reg').post(webRegister);
router.route('/web_log').post(webLogin);
router.route('/web_user').get(getAllUsers);
router.route('/web_user/:id').put(updateUser);


module.exports = router;    