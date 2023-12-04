import * as ordenesService from '../services/ordenes.service';

// GET ALL************************************************************************************************ */

export const GetAllOrders = async(req, res, next) => {
    try{
        const ordenesAll = await ordenesService.getOrdenesAll();
        if(ordenesAll) {
            return res.status(ordenesAll.status).json(ordenesAll);
        }
    }catch(error){
        next(error);
    }
};

// GET ONE BY ID************************************************************************************************ */

export const GatOneOrderByID = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el valor a consultar de los parámetros de la solicitud
    
        // Llamar a la función para buscar y pasa el valor
        const result = await ordenesService.getOrdenesOne(id);
    
        if(result) {
            return res.status(result.status).json(result);
        }
      } catch (error) {
        next(error);
      }
};

// POST********************************************************************************************** */
export const AddOneOrder = async(req, res, next) => {
    try{
        const ordenesAdded = await ordenesService.addOrdenes(req.body);
        
        if(ordenesAdded) {
            return res.status(ordenesAdded.status).json(ordenesAdded);
        }
    }catch(error){
        next(error);
    }
};
// FIN POST*************************************************************************************** */

// PUT*********************************************************************************************** */
export const UpdateOneOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await ordenesService.updateOrden(id, newData);

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


  export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;
        const productUpdated = await prodServServices.updateProduct(productId,updateData);
        if (productUpdated) {
            productUpdated.session = null;
            return res.status(productUpdated.status).json(productUpdated);
        }
    } catch (error) {
        next(error);
    }
}


// DELETE************************************************************************************************ */
export const DeleteOneOrder = async (req, res, next) => {
    try {
      const { id } = req.params; // Obtén el id del Pedido para eliminar
      
      // Llama al servicio de eliminación y pasa el valor a eliminar
      const result = await ordenesService.deleteOrdenOne(id);
  
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


export const UpdatePatchOneOrder = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtén el ID de la entrega desde los parámetros de la solicitud
        const newData = req.body; // Obtén los nuevos datos desde el cuerpo de la solicitud

        const result = await ordenesService.updateProductMethod(id, newData);

        if (result.status === 200) {
            return res.status(200).json(result);
        } else if (result.status === 404) {
            return res.status(404).json(result);
        }
    } catch (error) {
        next(error);
    }
}

