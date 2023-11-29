import Ordenes from '../models/ordenes.models';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';
export const getOrdenesAll = async() => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Extraer todas las ordenes";
        data.method = "GET";
        data.api = "/ordenes";
        data.process = "Extraer todas las odenes de la coleccción de Ordenes";

        const OrdenesAll = await Ordenes.find().then((ordenes) => {
            if(!ordenes) {
                data.status = 404;
                data.messageDEV = "La base de datos <<NO>> tiene ordenes configuradas";
                throw Error(data.messageDEV);
            }

            return ordenes;
        });

        data.status = 200; //200 = codigo cuando encuentras documentos
        data.messageUSR = "La extracción de las ordenes <<SI>> tuvo exito";
        data.dataRes = OrdenesAll;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La extracción de las ordenes <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}