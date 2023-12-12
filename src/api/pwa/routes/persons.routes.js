import { Router } from 'express';
import * as personsController from '../controllers/persons.controller';

const router = Router();

//FIC: Route to Get One Person Collection.
router.get('/:idPersonaOK', personsController.getPersonsOne);
//FIC: Route to Get All Persons Collection.
router.get('/', personsController.getPersonsAll);


export default router;