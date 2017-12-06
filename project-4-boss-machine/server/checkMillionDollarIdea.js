const checkMillionDollarIdea = (req, res, next) => {
  if (req.body.numWeeks && req.body.weeklyRevenue && !isNaN(parseFloat(req.body.numWeeks)) && !isNaN(parseFloat(req.body.weeklyRevenue))) {
    const revenue = Number(req.body.numWeeks) * Number(req.body.weeklyRevenue)
    if (revenue >= 1000000) {
      next()
    } else {
      res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
