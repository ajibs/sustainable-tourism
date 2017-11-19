const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const tourismController = require('../controllers/tourismController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();


router.get('/', catchErrors(tourismController.showHome));

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


router.get(
  '/create-tour',
  authController.isLoggedIn,
  tourismController.showTourForm
);
router.post(
  '/create-tour',
  authController.isLoggedIn,
  catchErrors(tourismController.addNewTour)
);


router.get('/explore', tourismController.showExplore);
router.post('/explore', catchErrors(tourismController.searchTours));


router.get('/tour/:id', catchErrors(tourismController.showSingleTour));
router.get(
  '/tour/reserve/:id',
  authController.isLoggedIn,
  catchErrors(tourismController.reserveTour)
);


// Google Authenticate
router.get('/auth/google', authController.googleAuth);
router.get('/auth/google/callback', authController.googleCallback);


router.get('/demo', userController.showDemo);
// router.get('/seed', catchErrors(tourismController.seedDB));


module.exports = router;
