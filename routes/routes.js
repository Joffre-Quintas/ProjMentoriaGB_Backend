const { Router } = require('express');
const PersonController = require('../controllers/PersonControllers');

const router = Router();

router.get('/', PersonController.showAllPeople);
router.post('/create-person', PersonController.createNewPerson);
router.get('/:uuid', PersonController.findOnePerson);
router.delete('/delete-person/:uuid', PersonController.deletePerson);
router.put('/update-person/:uuid', PersonController.updatePerson)

module.exports = router;