const { Router } = require('express');
const PersonController = require('../controllers/PersonControllers');

const router = Router();

router.get('/', PersonController.showAllPeople);
router.get('/list-of-legalage', PersonController.listOfLegalAge)
router.get('/list-of-not-legalage', PersonController.listOfLegalAge)
router.post('/create-person', PersonController.createNewPerson);
router.get('/find-person/:uuid', PersonController.findOnePerson);
router.delete('/delete-person/:uuid', PersonController.deletePerson);
router.put('/update-person/:uuid', PersonController.updatePerson)


module.exports = router;