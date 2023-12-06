
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

/* function updateNestedFields(target, source) {
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
}; */
