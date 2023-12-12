import Personas from '../../pwa/models/Personas';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';

//..................................................................................
//FIC: GET SERVICES ALL PERSONS
//..................................................................................


//FIC: Service for Get All Persons.
//..................................................................................
export const getPersonsAll = async () => {

	let bitacora = BITACORA();
	let data = DATA();

	try {

		bitacora.process = "Extraer todas las Personas."
		data.method = "GET";
		data.api =	"/persons";
		data.process = "Extraer todos los registros de la colección de Personas."

		const PersonsAll = await Personas.find()
			.then((persons) => {
				if (!persons) {
					data.status = 404;
					data.messageDEV = "La base de datos <<NO>> tiene Personas.";
					throw Error(data.messageDEV);
				}

				return persons;
			});
		/* .catch(error => {
			 error.statusCode = Bitacora.status;
			 throw error;
		 });*/

		data.messageUSR = "La extracción de las Personas <<SI>> fue Exitosa.";
		data.dataRes = PersonsAll;
		bitacora = AddMSG(bitacora, data, 'OK', 200, true);
		return OK(bitacora);
	} catch (error) {
		//await localSession.abortTransaction();
		if (!data.status) data.status = error.statusCode;
		let {message} = error;
		if (!data.messageDEV) data.messageDEV = message;
		if (data.dataRes.length === 0) data.dataRes = error;
		data.messageUSR = "La extracción de las Personas <<NO>> tuvo Exito." + "\n" +
			"Any operations that already occurred as part of this transaction will be rolled back.";
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
	}
	finally {
		//await localSession.endSession();
	}
};


//FIC: Service for Get One Person.
//..................................................................................
export const getPersonsOne = async (idPersonaOK) => {

	let bitacora = BITACORA();
	let data = DATA();

	try {

		bitacora.process = "Extraer una Persona."
		data.method = "GET";
		data.api =	"/persons/:idPersonaOK";
		data.process = "Extraer un registro de la colección de Personas."

		const PersonsOne = await Personas.findOne(
			{IdPersonaOK: idPersonaOK}
			).then((person) => {
				if (!person) {
					data.status = 404;
					data.messageDEV = "La base de datos <<NO>> tiene Personas.";
					throw Error(data.messageDEV);
				}

				return person;
			});

		data.messageUSR = "La extracción de la Persona <<" + idPersonaOK + ">> <<SI>> fue Exitosa.";
		data.dataRes = PersonsOne;
		bitacora = AddMSG(bitacora, data, 'OK', 200, true);
		return OK(bitacora);
	} catch (error) {
		//await localSession.abortTransaction();
		if (!data.status) data.status = error.statusCode;
		let {message} = error;
		if (!data.messageDEV) data.messageDEV = message;
		if (data.dataRes.length === 0) data.dataRes = error;
		data.messageUSR = "La extracción de la Persona <<" + idPersonaOK + ">> <<NO>> tuvo Exito." + "\n" +
			"Any operations that already occurred as part of this transaction will be rolled back.";
		bitacora = AddMSG(bitacora, data, 'FAIL');
		return FAIL(bitacora);
	}
	finally {
		//await localSession.endSession();
	}
};

