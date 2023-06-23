/////////////////////
// Visits Router 
/////////////////////

const visits_router = require('express').Router()

const {
    getAllVisits,
    getCalendar,
    getCreateVisit,
    postCreateVisit,
    getEditVisitById,
    postEditVisitById,
    deleteVisit,
} = require('../controller/visits.controller')

visits_router.get('/all', getAllVisits)
visits_router.get('/calendar', getCalendar)
visits_router.route('/create').get(getCreateVisit).post(postCreateVisit)
visits_router.route('/edit/:id').get(getEditVisitById).post(postEditVisitById)
visits_router.delete('/delete/:id', deleteVisit)

module.exports = visits_router;