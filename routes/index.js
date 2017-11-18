const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tourismController = require('../controllers/tourismController');

const router = express.Router();


router.get('/', tourismController.showHome);

router.get('/signup', userController.showSignup);
router.post(
  '/signup',
  userController.validateSignup,
  authController.signup
);

router.get('/login', userController.showLogin);
router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/profile', userController.showProfile);


module.exports = router;
