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
export const GetOneOrderByID = async (id) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Obtener Orden por ID: ${id}`;
    data.method = "GET";
    data.api = `/orders/${id}`;
    data.process = `Obtener un orden específico de la colección de Ordenes por su ID`;

    const oneOrder = await ordersModel.findOne({ IdOrdenOK: id });
    if (!oneOrder) {
      data.status = 404;
      data.messageDEV = `No se encontró una orden con el ID ${id}.`;
      throw Error(data.messageDEV);
    }

    data.status = 200;
    data.messageUSR = "La obtención de la orden <<SI>> tuvo éxito";
    data.dataRes = oneOrder;

    bitacora = AddMSG(bitacora, data, "OK", 200, true);

    return OK(bitacora);
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
export const UpdateOneOrder = async (id, newData) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
      bitacora.process = `Actualizar la Orden con ID ${id}`;
      data.method = "PUT";
      data.api = `/ordenes/${id}`;
      data.process = "Actualizar la orden en la colección de Ordenes";

      const updatedOrden = await ordersModel.findOneAndUpdate({ IdOrdenOK: id }, newData, {
          new: true, 
      });

      if (!updatedOrden) {
          data.status = 404;
          data.messageDEV = `No se encontró una orden con el ID ${id}`;
          throw Error(data.messageDEV);
      }

      data.status = 200;
      data.messageUSR = `Orden con el ID ${id} se actualizó con éxito`;
      data.dataRes = updatedOrden;

      bitacora = AddMSG(bitacora, data, 'OK', 200, true);

      return OK(bitacora);
  } catch (error) {
      if (!data.status) data.status = error.statusCode;
      let { message } = error;
      if (!data.messageDEV) data.messageDEV = message;
      if (data.dataRes.length !== 0) data.dataRes = error;
      data.messageUSR = `La actualización de la orden con ID ${id} falló`;

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
export const UpdatePatchOneOrder = async (id, updateData) => {
  let bitacora = BITACORA();
  let data = DATA();
  try {
    bitacora.process = "Modificar una orden";
    data.process = "Modificar una orden";
    data.method = "PATCH";
    data.api = `/orders/update/${id}`;
    const updateQuery = {};
    const keys = Object.keys(updateData);
    for (let i = 0; i < keys.length; i++) {
      const obj = keys[i];
      updateQuery[obj] = updateData[obj];
      if (i === keys.length - 1) {
        break;
      }
    }

    const productoUpdated = await ordersModel.findOneAndUpdate(
      { IdOrdenOK: id },
      updateQuery,
      { new: true, useFindAndModify: false }
    );

    data.messageUSR =
      "La Modificacion de los subdocumentos de producto SI fue exitoso.";
    data.dataRes = productoUpdated;
    bitacora = AddMSG(bitacora, data, "OK", 201, true);
    return OK(bitacora);
  } catch (error) {
    console.error(error);
    if (!data.status) data.status = error.statusCode;
    let { message } = error;
    if (!data.messageDEV) data.messageDEV = message;
    if (data.dataRes.length === 0) data.dataRes = error;
    data.messageUSR =
      "La Modificacionión del producto NO fue exitoso." +
      "\n" +
      "Any operations that already occurred as part of this transaction will be rolled back.";
    bitacora = AddMSG(bitacora, data, "FAIL");
    return FAIL(bitacora);
  }
};
//==========================================FIN PATCH===========================================================

//===========================================DELETE===========================================================
export const DeleteOneOrder = async (id) => {
  let bitacora = BITACORA();
  let data = DATA();

  try {
    bitacora.process = `Eliminar la orden con ID ${id}`;
    data.method = "DELETE";
    data.api = `/orders/${id}`;
    data.process = "Eliminar la orden en la colección de Ordenes";
    // Realiza la eliminación del documento en función del valor proporcionado
    const result = await ordersModel.deleteOne({ IdOrdenOK: id });

    if (result.deletedCount === 0) {
      // Si no se encontró un documento para eliminar, lanza un error
      //throw new Error('Orden no encontrada.');
      data.status = 404;
      data.messageDEV = `No se encontró una orden con el ID ${id}`;
      throw Error(data.messageDEV);
    }

    //return { message: 'Orden eliminada correctamente.' };
    data.status = 200;
    data.messageUSR = `Orden con el ID ${id} se elimino con éxito`;
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
