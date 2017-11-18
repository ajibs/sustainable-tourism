const Experience = require('../models/Experience');

exports.showHome = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};


exports.showTourForm = (req, res) => {
  res.render('create-tour', {
    title: 'Create Tour',
    user: req.user.local.firstName
  });
};


exports.addNewTour = (req, res) => {
  const tour = new Experience(req.body);
  tour.save((err) => {
    if (err) console.error(err);
    else {
      req.flash('success', 'Tour Created Successfully');
      res.redirect('/profile');
    }
  });
};
