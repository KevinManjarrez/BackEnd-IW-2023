import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";

const etiquetasSchema = new mongoose.Schema({
    IdInstitutoOK: { type: String },
    IdEtiquetaOK: { type: String },
    Etiqueta: { type: String },
    Indice: { type: String },
    Coleccion: { type: String },
    Seccion: { type: String },
    Secuencia: { type: Number },
    valores: [
      {
        IdValorOK: { type: String },
        Valor: { type: String },
        Secuencia: { type: Number },
        Imagen: { type: String },
      },
    ],
    detail_row: {
      Activo: { type: String, default: "S" },
      Borrado: { type: String, default: "N" },
      detail_row_reg: [
        {
          FechaReg: { type: Date, default: Date.now },
          UsuarioReg: { type: String },
        },
      ],
    },
  });

const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo(
  "cat_etiquetas",
  etiquetasSchema,
  conn,
  dbName,
  dbCluster
);

export default model;
