import ordersModel from "../models/ordenes.models";
import {
  OK,
  FAIL,
  BITACORA,
  DATA,
  AddMSG,
} from "../../../middlewares/respPWA.handler";

//==========================================GET===========================================================S
export const GetAllOrders = async () => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Extraer todas las ordenes";
    data.method = "GET";
    data.api = "/orders";
    data.process = "Extraer todas las odenes de la coleccción de Ordenes";

    const allOrders = await ordersModel.find().then((orders) => {
      if (!orders) {
        data.status = 404;
        data.messageDEV = "La base de datos <<NO>> tiene ordenes configuradas";
        throw Error(data.messageDEV);
      }

      return orders;
    });

    data.status = 200; //200 = codigo cuando encuentras documentos
    data.messageUSR = "La extracción de las ordenes <<SI>> tuvo exito";
    data.dataRes = allOrders;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La extracción de las ordenes <<NO>> tuvo exito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET===========================================================

//==========================================GET ONE BY ID===========================================================S
export const GetOneOrderByID = async (IdInstitutoOK, IdNegocioOK,IdOrdenOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Obtener Orden por id`;
    data.method = "GET";
    data.api = `/orders/${IdInstitutoOK}`;
    data.process = `Obtener un orden específico de la colección de Ordenes por su ID`;

    const oneOrder = await ordersModel.findOne({ 
      IdInstitutoOK: IdInstitutoOK, 
      IdNegocioOK: IdNegocioOK, 
      IdOrdenOK: IdOrdenOK 
    });
    if (!oneOrder) {
      data.status = 404;
      data.messageDEV = `No se encontró una orden con id.`;
      throw Error(data.messageDEV);
    }else{

    data.status = 200;
    data.messageUSR = "La obtención de la orden <<SI>> tuvo éxito";
    data.dataRes = oneOrder;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  }
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La obtención de la orden <<NO>> tuvo éxito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN GET===========================================================

//=========================================POST===========================================================
export const AddOneOrder = async (newOrden) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = "Agregar una nueva orden";
    data.method = "POST";
    data.api = "/orders";
    data.process = "Agregar una nueva orden a la coleccción de Ordenes";

    const addedOrder = await ordersModel.insertMany(newOrden, { order: true }).then(
      (order) => {
        if (!order) {
          data.status = 400; //400 de que no se pudo insertar; es diferente a 404
          data.messageDEV = "La inserción de la orden <<NO>> fue exitosa";
          throw Error(data.messageDEV);
        }

        return order;
      }
    );

    data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
    data.messageUSR = "La inserción de la orden <<SI>> fue exitosa";
    data.dataRes = addedOrder;

    bitacora = AddMSG(bitacora, data, "OK", 201, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La inserción de la orden <<NO>> fue exitosa";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    //Haya o no error siempre ejecuta aqui
  }
};
//=========================================FIN POST===========================================================

//==============================================PUT===========================================================
//==============================================PUT===========================================================
export const UpdateOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK, newData) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
      bitacora.process = `Actualizar la Orden con ID`;
      data.method = "PUT";
      data.api = `/orders/${IdInstitutoOK}`;
      data.process = "Actualizar la orden en la colección de Ordenes";

      const updatedOrden = await ordersModel.findOneAndUpdate({ IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK,IdOrdenOK: IdOrdenOK }, newData, {
          new: true, 
      });

      if (!updatedOrden) {
          data.status = 404;
          data.messageDEV = `No se encontró una orden con el ID`;
          throw Error(data.messageDEV);
      }

      data.status = 200;
      data.messageUSR = `Orden con el ID se actualizó con éxito`;
      data.dataRes = updatedOrden;

      bitacora = AddMSG(bitacora, data, 'OK', 200, true);

      return OK(bitacora);
  } catch (error) {
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (data.dataRes.length !== 0) data.dataRes = error;
      data.messageUSR = `La actualización de la orden con ID falló`;

      bitacora = AddMSG(bitacora, data, 'FAIL');

      return FAIL(bitacora);
  }
  finally {
      // Haya o no error siempre ejecuta aquí
  }
}
//==========================================FIN PUT===========================================================
//==========================================FIN PUT===========================================================

//===========================================PATCH===========================================================


/* export const UpdatePatchOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK, updateData) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = 'Modificar un producto.';
    data.process = 'Modificar un producto por unidad';
    data.method = 'PATCH';
    data.api = `/orders/${IdInstitutoOK}`;

    // Construir las condiciones de búsqueda
    const conditions = {
      IdInstitutoOK: IdInstitutoOK,
      IdNegocioOK: IdNegocioOK,
      IdOrdenOK: IdOrdenOK
    };

    // Construir la actualización basada en el cuerpo de la solicitud
    const update = { $set: {} };

    // Iterar sobre las claves del cuerpo de la solicitud
    for (const key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        if (key === 'ordenes_estatus') {
          // Para el arreglo 'ordenes_estatus', construir las actualizaciones específicas
          update.$set[key] = updateData[key].map((updatedStatus) => ({
            'ordenes_estatus.$[elem].IdTipoEstatusOK': updatedStatus.IdTipoEstatusOK
          }));

          // Establecer el filtro de arrayFilters
          update.arrayFilters = [{ 'elem.IdTipoEstatusOK': { $eq: updatedStatus.IdTipoEstatusOK } }];
        } else {
          // Para otras claves, simplemente establecer el valor
          update.$set[key] = updateData[key];
        }
      }
    }

    // Ejecutar la actualización utilizando findOneAndUpdate
    const result = await ordersModel.findOneAndUpdate(conditions, update, { new: true });

    if (!result) {
      data.status = 404;
      data.messageDEV = `No se encontró una orden con el ID`;
      throw new Error(data.messageDEV);
    }

    data.status = 200;
    data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
    data.dataRes = result;
    bitacora = AddMSG(bitacora, data, 'OK', 201, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode || 500;
    if (!data.messageDEV) data.messageDEV = error.message || 'Error desconocido';

    if (data.dataRes === undefined) data.dataRes = error;

    data.messageUSR = `La actualización de la orden con ID falló`;

    bitacora = AddMSG(bitacora, data, 'FAIL');

    return FAIL(bitacora);
  }
}; */

function updateNestedFields(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object) {
      if (!target[key]) target[key] = {};
      updateNestedFields(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}

export const UpdatePatchOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK, updateData) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = 'Modificar un producto.';
    data.process = 'Modificar un producto por unidad';
    data.method = 'PATCH';
    data.api = `/orders/${IdInstitutoOK}`;

    const currentOrder = await ordersModel.findOne({ IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK,IdOrdenOK: IdOrdenOK });
    console.log(currentOrder);
    
    if (!currentOrder) {
      data.status = 404;
      data.messageDEV = `No se encontró una orden con el ID`;
      throw new Error(data.messageDEV);
    }

    updateNestedFields(currentOrder, updateData);

    // Guardar los cambios
    const result = await currentOrder.save();

    // Devolver solo las propiedades actualizadas
    data.dataRes = Object.keys(updateData).reduce((acc, key) => {
      acc[key] = result[key];
      return acc;
    }, {});

    data.status = 200;
    data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
    bitacora = AddMSG(bitacora, data, 'OK', 201, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode || 500;
    if (!data.messageDEV) data.messageDEV = error.message || 'Error desconocido';

    if (data.dataRes === undefined) data.dataRes = error;

    data.messageUSR = `La actualización de la orden con ID falló`;

    bitacora = AddMSG(bitacora, data, 'FAIL');

    return FAIL(bitacora);
  }
};

//==========================================FIN PATCH===========================================================

//===========================================DELETE===========================================================
export const DeleteOneOrder = async (IdInstitutoOK, IdNegocioOK, IdOrdenOK) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Eliminar la orden con ID`;
    data.method = "DELETE";
    data.api = `/orders/${IdInstitutoOK}`;
    data.process = "Eliminar la orden en la colección de Ordenes";
    // Realiza la eliminación del documento en función del valor proporcionado
    const result = await ordersModel.deleteOne({ IdInstitutoOK: IdInstitutoOK, IdNegocioOK: IdNegocioOK,IdOrdenOK: IdOrdenOK });

    if (result.deletedCount === 0) {
      // Si no se encontró un documento para eliminar, lanza un error
      //throw new Error('Orden no encontrada.');
      data.status = 404;
      data.messageDEV = `No se encontró una orden con el ID`;
      throw Error(data.messageDEV);
    }

    //return { message: 'Orden eliminada correctamente.' };
    data.status = 200;
    data.messageUSR = `Orden con el ID se elimino con éxito`;
    data.dataRes = result;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
  } catch (error) {
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (!data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR = "La eliminacion de la orden <<NO>> tuvo exito";

    bitacora = AddMSG(bitacora, data, "FAIL");

    return FAIL(bitacora);
  } finally {
    // Haya o no error siempre ejecuta aquí
  }
};
//=======================================FIN DELETE===========================================================
