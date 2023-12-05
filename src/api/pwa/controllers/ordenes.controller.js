import * as ordersService from "../services/ordenes.service";

// GET ALL************************************************************************************************ */

export const GetAllOrders = async (req, res, next) => {
  try {
    const ordenesAll = await ordersService.GetAllOrders();
    if (ordenesAll) {
      return res.status(ordenesAll.status).json(ordenesAll);
    }
  } catch (error) {
    next(error);
  }
};

// GET ONE BY ID************************************************************************************************ */

export const GetOneOrderByID = async (req, res, next) => {
  try {
    const { idInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await ordersService.GetOneOrderByID(idInstitutoOK, IdNegocioOK,IdOrdenOK);

    if (result) {
      return res.status(result.status).json(result);
    }
  } catch (error) {
    next(error);
  }
};

// POST********************************************************************************************** */
export const AddOneOrder = async (req, res, next) => {
  try {
    const ordenesAdded = await ordersService.AddOneOrder(req.body);

    if (ordenesAdded) {
      return res.status(ordenesAdded.status).json(ordenesAdded);
    }
  } catch (error) {
    next(error);
  }
};
// FIN POST*************************************************************************************** */
// PUT*********************************************************************************************** */
export const UpdateOneOrder = async (req, res, next) => {
    try {
      const { idInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        // Llamar a la función para buscar y pasa el valor
        const result = await ordersService.UpdateOneOrder(idInstitutoOK, IdNegocioOK,IdOrdenOK,newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
};
// FIN PUT********************************************************************************************* */
// FIN PUT********************************************************************************************* */
//PUT PATCH********************************************************************************************* */
export const UpdatePatchOneOrder = async (req, res, next) => {
  try {
    const { idInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud
    const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await ordersService.UpdatePatchOneOrder(idInstitutoOK, IdNegocioOK,IdOrdenOK,newData);

    if (result.status === 200) {
      return res.status(200).json(result);
    } else if (result.status === 404) {
      return res.status(404).json(result);
    }
  } catch (error) {
    next(error);
  }
};
//FIN PUT PATCH********************************************************************************************* */

// DELETE************************************************************************************************ */
export const DeleteOneOrder = async (req, res, next) => {
  try {
    const { idInstitutoOK, IdNegocioOK,IdOrdenOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await ordersService.DeleteOneOrder(idInstitutoOK, IdNegocioOK,IdOrdenOK);


    if (result.status === 200) {
      return res.status(200).json(result);
    } else if (result.status === 404) {
      return res.status(404).json(result);
    }
  } catch (error) {
    next(error);
  }
};
// FIN DELETE********************************************************************************************* */
