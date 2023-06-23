///////////////////////////////////
//       Visits Controller
///////////////////////////////////

const session = require("express-session");
const Visit = require("../model/visit.model");
const User = require('../model/user.model')


//////////////
// Functions
//////////////

// (GET) Get all Visits
exports.getAllVisits = (req, res) => {
  if(req.session.isLoggedIn){
    const session = req.session.isLoggedIn
    Visit.find()
    .then((rows) => {
      res.render("visits", { model: rows, session: session });
    })
    .catch((err) => console.error(err.message));
  }else{
    res.redirect('/auth/login')
  }
};


// (GET) Get Calendar
exports.getCalendar = (req, res) => {

  const session = req.session.isLoggedIn
  if(req.session.isLoggedIn){
    res.render('calendar', {model: {}, session: session})
  }
  else{
    res.redirect('/auth/login')
  }
}

// (GET) Get Create Visit page
exports.getCreateVisit = (req, res) => {
  const session = req.session.isLoggedIn
  if(req.session.isLoggedIn){
    res.render("create", {model: {}, session: session });
  }else{
    res.render('login', {session: session})
  }
};

// (POST) Creating New Visit
exports.postCreateVisit = (req, res) => {
  if(req.session.isLoggedIn){
    const { People, Area, Land, Special_bus, Date, Time, Notes } = req.body;

    const newVisit = new Visit(People, Area, Land, Special_bus, Date, Time, Notes);
    newVisit
      .save()
      .then(() => {
        res.redirect("/visits/all");
      })
      .catch((err) => console.error(err.message));
  }else{
    res.redirect('/auth/login')
  }
};


// (GET) Get Edit Visit Page by ID
exports.getEditVisitById = (req, res) => {
  const id = req.params.id;
  const session = req.session.isLoggedIn
  if(session){
    Visit.findById(id)
    .then((rows) => {
      res.render("edit", { model: rows[0], session: session });
    })
    .catch((err) => console.error(err.message));
  } else{
    res.render('login', {session: session})
  }
};


// (POST) Post changes of Visit by ID
exports.postEditVisitById = (req, res) => {
  const id = req.params.id;
  const { People, Area, Land, Special_bus, Date, Time, Notes } = req.body;

  const dataToUpdate = { id, People, Area, Land, Special_bus, Date, Time, Notes };

  Visit.updateOne(dataToUpdate)
    .then(() => {
      res.redirect("/visits/all");
    })
    .catch((err) => console.error(err.message));
};

// (POST) Delete Visit by ID
exports.deleteVisit = (req, res) => {
  const id = req.params.id;

  Visit.deleteOne(id)
    .then(() => {
      res.redirect("/visits/all");
    })
    .catch((err) => console.error(err));
};