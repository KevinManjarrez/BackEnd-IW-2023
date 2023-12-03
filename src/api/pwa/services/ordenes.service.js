import Ordenes from '../models/ordenes.models';
import { OK, FAIL, BITACORA, DATA, AddMSG } from '../../../middlewares/respPWA.handler';


//==========================================GET===========================================================S
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
//=========================================FIN GET===========================================================






//==========================================GET ONE BY ID===========================================================S
export const getOrdenesOne = async (id) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Obtener Orden por ID: ${id}`;
        data.method = "GET";
        data.api = `/ordenes/${id}`;
        data.process = `Obtener un orden específico de la colección de Ordenes por su ID`;

        const OrdenId = await Ordenes.findOne({ IdOrdenOK: id });
        if (!OrdenId) {
            data.status = 404;
            data.messageDEV = `No se encontró una orden con el ID ${id}.`;
            throw Error(data.messageDEV);
        }

        data.status = 200;
        data.messageUSR = "La obtención de la orden <<SI>> tuvo éxito";
        data.dataRes = OrdenId;

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);

    } catch (error) {
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La obtención de la orden <<NO>> tuvo éxito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    } finally {
        //Haya o no error siempre ejecuta aqui
    }
}
//=========================================FIN GET===========================================================








//=========================================POST===========================================================
export const addOrdenes = async(newOrden) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = "Agregar una nueva orden";
        data.method = "POST";
        data.api = "/orden";
        data.process = "Agregar una nueva orden a la coleccción de Ordenes";

        const ordenAdded = await Ordenes.insertMany(
            newOrden,
            { orden: true }
        )
        .then((orden) => {
            if(!orden) {
                data.status = 400; //400 de que no se pudo insertar; es diferente a 404
                data.messageDEV = "La inserción de la orden <<NO>> fue exitosa";
                throw Error(data.messageDEV);
            }

            return orden;
        });

        data.status = 201; //201 = codigo cuando se inserta exitosamente SIUU
        data.messageUSR = "La inserción de la orden <<SI>> fue exitosa";
        data.dataRes = ordenAdded;

        bitacora = AddMSG(bitacora, data, 'OK', 201, true);

        return OK(bitacora);

    }catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La inserción de la orden <<NO>> fue exitosa";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        //Haya o no error siempre ejecuta aqui
    }
}
//=========================================FIN POST===========================================================








//==============================================PUT===========================================================
export const updateOrden = async (id, newData) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Actualizar la Orden con ID ${id}`;
        data.method = "PUT";
        data.api = `/ordenes/${id}`;
        data.process = "Actualizar la orden en la colección de Ordenes";

        const updatedOrden = await Ordenes.findOneAndUpdate({ IdOrdenOK: id }, newData, {
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


//===========================================PATCH===========================================================
export const updateProductMethod = async (ordenId, updateData) => {
    let bitacora = BITACORA();
    let data = DATA();
    try {
        bitacora.process = 'Modificar un producto.';
        data.process = 'Modificar un producto';
        data.method = 'PATCH';
        data.api = '/cat-prod-serv';
        //Actualizar cada propiedad de updateData
        //NOTA, si se le manda un nombre distinto de un subdocumento, no pasará nada
        let productoUpdated = null
        for (const obj of Object.keys(updateData)) {
            for (const propiedad in obj) {
                if (obj.hasOwnProperty(propiedad)) {
                    const updateQuery = {};
                    updateQuery[propiedad] = obj[propiedad];
                    try {
                        productoUpdated = await Ordenes.findOneAndUpdate(
                        { IdOrdenOK: ordenId },
                        updateQuery,
                        { new: true }
                    );
                    if (!productoUpdated) {
                        console.error("No se encontró un documento para actualizar con ese ID,",ordenId);
                        data.status = 400;
                        data.messageDEV = 'La Actualización de un Subdocumento del producto NO fue exitoso.';
                        throw new Error(data.messageDEV);
                    }
                    } catch (error) {
                        console.error(error);
                        data.status = 400;
                        data.messageDEV = 'La Actualizacion de un Subdocumento del producto NO fue exitoso.';
                        throw Error(data.messageDEV);
                    }
                }
            }
       
        }
        data.messageUSR = 'La Modificacion de los subdocumentos de producto SI fue exitoso.';
        data.dataRes = productoUpdated;
        bitacora = AddMSG(bitacora, data, 'OK', 201, true);
        return OK(bitacora);
    } catch (error) {
        console.error(error)
        if (!data.status) data.status = error.statusCode;
        let { message } = error;
        if (!data.messageDEV) data.messageDEV = message;
        if (data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR =
            'La Modificacionión del producto NO fue exitoso.' +
            '\n' +
            'Any operations that already occurred as part of this transaction will be rolled back.';
        bitacora = AddMSG(bitacora, data, 'FAIL');
        return FAIL(bitacora);
    }
};
//==========================================FIN PATCH===========================================================





//===========================================DELETE===========================================================
export const deleteOrdenOne = async (id) => {
    let bitacora = BITACORA();
    let data = DATA();

    try {
        bitacora.process = `Eliminar la orden con ID ${id}`;
        data.method = "DELETE";
        data.api = `/ordenes/${id}`;
        data.process = "Eliminar la orden en la colección de Ordenes";
      // Realiza la eliminación del documento en función del valor proporcionado
      const result = await Ordenes.deleteOne({ IdOrdenOK: id });
  
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

        bitacora = AddMSG(bitacora, data, 'OK', 200, true);

        return OK(bitacora);
    } catch (error) {
        if(!data.status) data.status = error.statusCode;
        let {message} = error;
        if(!data.messageDEV) data.messageDEV = message;
        if(!data.dataRes.length === 0) data.dataRes = error;
        data.messageUSR = "La eliminacion de la orden <<NO>> tuvo exito";

        bitacora = AddMSG(bitacora, data, 'FAIL');

        return FAIL(bitacora);
    }
    finally {
        // Haya o no error siempre ejecuta aquí
    }
  };
//=======================================FIN DELETE===========================================================