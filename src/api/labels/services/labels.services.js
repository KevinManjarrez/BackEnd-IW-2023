import labelsModel from "../models/labels";
import personaModel from "../models/persona";

import {
  OK,
  FAIL,
  BITACORA,
  DATA,
  AddMSG,
} from "../../../middlewares/respPWA.handler";

//==========================================GET===========================================================S

export const GetAllLabels = async () => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Extraer labels";
    data.method = "GET";
    data.api = "/labels";
    data.process = "Extraer todas las labels de la coleccción de cat_labels";

    const allLabels = await labelsModel.find().then((labels) => {
      if (!labels) {
        data.status = 404;
        data.messageDEV = "La base de datos <<NO>> tiene labels configuradas";
        throw Error(data.messageDEV);
      }

      return labels;
    });

    data.status = 200; //200 = codigo cuando encuentras documentos
    data.messageUSR = "La extracción de las labels <<SI>> tuvo exito";
    data.dataRes = allLabels;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);
    console.log("exito")

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La extracción de las labels <<NO>> tuvo exito";
    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET===========================================================

//==========================================GET ONE BY ID===========================================================S
export const GetOneLabels = async (IdInstitutoOK, IdEtiquetaOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Obtener Etiqueta por Instituto y negocio`;
    data.method = "GET ONE LABELS";
    data.api = `/labels/${IdInstitutoOK}`;
    data.process = `Obtener una Etiqueta específica de la colección de Labels por IdInstituto y Negocio`;

    const oneLabel = await labelsModel.findOne({ 
      IdInstitutoOK: IdInstitutoOK, 
      IdEtiquetaOK: IdEtiquetaOK
    });
    if (!oneLabel) {
      data.status = 404;
      data.messageDEV = `No se encontró una Etiqueta con id.`;
      throw Error(data.messageDEV);
    }else{

    data.status = 200;
    data.messageUSR = "La obtención de la Etiqueta <<SI>> tuvo éxito";
    data.dataRes = oneLabel;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  }
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La obtención de la Etiqueta <<NO>> tuvo éxito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET ONE BY ID===========================================================


export const GetPersona = async () => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Extraer labels";
    data.method = "GET";
    data.api = "/orders/persona";
    data.process = "Extraer todas las labels de la coleccción de cat_labels";

    const allLabels = await personaModel.find().then((labels) => {
      if (!labels) {
        data.status = 404;
        data.messageDEV = "La base de datos <<NO>> tiene labels configuradas";
        throw Error(data.messageDEV);
      }

      return labels;
    });

    data.status = 200; //200 = codigo cuando encuentras documentos
    data.messageUSR = "La extracción de las labels <<SI>> tuvo exito";
    data.dataRes = allLabels;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);
    console.log("exito")

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La extracción de las labels <<NO>> tuvo exito";
    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
