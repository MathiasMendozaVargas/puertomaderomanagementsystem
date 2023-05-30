const Visit = require("../model/visit.model");

exports.getAllVisits = (req, res) => {
  Visit.find()
    .then((rows) => {
      res.render("visits", { model: rows });
    })
    .catch((err) => console.error(err.message));
};

exports.getCreateVisit = (req, res) => {
  res.render("create", { model: {} });
};

exports.postCreateVisit = (req, res) => {
  const { People, Area, Land, Special_bus, Date, Time, Notes } = req.body;

  const newVisit = new Visit(People, Area, Land, Special_bus, Date, Time, Notes);
  newVisit
    .save()
    .then(() => {
      res.redirect("/visits/all");
    })
    .catch((err) => console.error(err.message));
};

exports.getEditVisitById = (req, res) => {
  const id = req.params.id;
  Visit.findById(id)
    .then((rows) => {
      res.render("edit", { model: rows[0] });
    })
    .catch((err) => console.error(err.message));
};

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

exports.deleteVisit = (req, res) => {
  const id = req.params.id;

  Visit.deleteOne(id)
    .then(() => {
      res.redirect("/visits/all");
    })
    .catch((err) => console.error(err));
};