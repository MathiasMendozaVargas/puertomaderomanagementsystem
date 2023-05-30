/////////////////////
// Visits Router 
/////////////////////

const router = require('express').Router()

const {
    getAllVisits,
    getCreateVisit,
    postCreateVisit,
    getEditVisitById,
    postEditVisitById,
    deleteVisit
} = require('../controller/visits.controller')

router.get('/all', getAllVisits)
router.route('/create').get(getCreateVisit).post(postCreateVisit)
router.route('/edit/:id').get(getEditVisitById).post(postEditVisitById)
router.delete('/delete/:id', deleteVisit)

module.exports = router;