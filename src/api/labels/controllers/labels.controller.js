import * as labelsService from "../services/labels.services";

// GET ALL LABELS********************************************************************************************* */
export const GetAllLabels = async (req, res, next) => {
  try {
    const labelsAll = await labelsService.GetAllLabels();
    if (labelsAll) {
      return res.status(labelsAll.status).json(labelsAll);
     
    }
  } catch (error) {
    next(error);
  }
};

// GET ALL LABELS********************************************************************************************* */

 // GET ONE BY ID************************************************************************************************ */
export const GetOneLabels = async (req, res, next) => {
  try {
    const { IdInstitutoOK, IdNegocioOK } = req.query; // Obtén el valor a consultar de los parámetros de la solicitud

    // Llamar a la función para buscar y pasa el valor
    const result = await labelsService.GetOneLabels(IdInstitutoOK, IdNegocioOK);

    if (result) {
      return res.status(result.status).json(result);
    }
  } catch (error) {
    next(error);
  }
};

// GET ALL LABELS********************************************************************************************* */
export const GetPersona = async (req, res, next) => {
  try {
    const labelsAll = await labelsService.GetPersona();
    if (labelsAll) {
      return res.status(labelsAll.status).json(labelsAll);
     
    }
  } catch (error) {
    next(error);
  }
};
// GET ALL LABELS********************************************************************************************* */
