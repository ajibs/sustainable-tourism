const Experience = require('../models/Experience');

exports.showHome = async (req, res) => {
  const tours = await Experience.find({})
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(6);

  res.render('index', {
    title: 'Home',
    tours
  });
};


exports.showTourForm = (req, res) => {
  res.render('create-tour', {
    title: 'Create Tour'
  });
};


exports.addNewTour = async (req, res) => {
  req.body.location = req.body.location.toLowerCase();
  const tour = new Experience(req.body);
  await tour.save();

  req.flash('success', 'Tour Created Successfully');
  res.redirect('/profile');
};


exports.showExplore = async (req, res) => {
  const tours = await Experience.find({})
    .sort({ _id: -1 })
    .limit(18);

  res.render('explore', {
    title: 'Explore',
    tours
  });
};


exports.searchTours = async (req, res) => {
  let { location } = req.body;
  location = location.toLowerCase();
  const tours = await Experience.find({ location });

  if (!tours.length) {
    req.flash('failed', 'Tours not found for that city');
    res.redirect('back');
    return;
  }

  res.render('explore', {
    title: 'Explore',
    tours
  });
};


exports.seedDB = async (req, res) => {
  // create demo data
  const demo = {
    title: 'Clubbing at Quilox',
    summary: 'Party with the stars',
    location: 'lagos, nigeria',
    price: 500,
    date: '2017-12-27T00:00:00.000Z',
    fullDescription: 'Enjoy the best of Lagos night life, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet'
  };

  Experience.remove({}, () => { // empty database then save documents
    let i = 0;
    while (i < 25) {
      const tour = new Experience(demo);
      tour.save();
      i++;
    }
  });

  req.flash('success', 'Database Seeded Successfully');
  res.redirect('/');
}