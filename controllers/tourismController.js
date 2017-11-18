exports.showHome = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};
