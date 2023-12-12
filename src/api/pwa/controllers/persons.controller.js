import * as personsServices from '../services/persons.services';


//.................................................................
//FIC: GET CONTROLLER FOR PERSONS
//.................................................................

//FIC: Controller for Get All Persons.
//.................................................................
export const getPersonsAll = async (req, res, next) => {
	try {
		const personsAll = await personsServices.getPersonsAll();
		if (personsAll) {
			return res.status(personsAll.status).json(personsAll);
		}
	} catch (error) {
		next(error);
	}
};

//FIC: Controller for Get One Person.
//.................................................................
export const getPersonsOne = async (req, res, next) => {
	try {
		const { idPersonaOK } = req.params;
		const personsOne = await personsServices.getPersonsOne(idPersonaOK);
		if (personsOne) {
			return res.status(personsOne.status).json(personsOne);
		}
	} catch (error) {
		next(error);
	}
};


