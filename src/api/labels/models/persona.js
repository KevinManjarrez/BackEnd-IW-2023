import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";

const etiquetasSchema = new mongoose.Schema({
    IdPersonaOK: { type: String },
    IdPersonaBK: { type: String },
    Nombre: { type: String },
    ApPaterno: { type: String },
    ApMaterno: { type: String },
    RFC: { type: String },
    CURP: { type: String },
    FechaNac: { type: Date },
    Sexo: { type: String },
    Alias: { type: String },
    cat_personas_telefonos: [
      {
        CodPais: { type: String },
        NumTelefono: { type: String },
        NumExtension: { type: String },
        Principal: { type: String },
        detail_row: {
          Activo: { type: String },
          Borrado: { type: String },
          detail_row_reg: [
            {
              FechaReg: { type: Date, default: Date.now },
              UsuarioReg: { type: String },
            },
          ],
        },
      },
    ],
    cat_personas_dir_webs: [
      {
        DesDirWeb: { type: String },
        DireccionWeb: { type: String },
        Principal: { type: String },
        detail_row: {
          Activo: { type: String },
          Borrado: { type: String },
          detail_row_reg: [
            {
              FechaReg: { type: Date, default: Date.now },
              UsuarioReg: { type: String },
            },
          ],
        },
      },
    ],
    cat_personas_domicilios: [
      {
        CalleNumero: { type: String },
        EntreCalle1: { type: String },
        EntreCalle2: { type: String },
        Referencia: { type: String },
        CodPostal: { type: String },
        Principal: { type: String },
        CoordenadasXY: { type: String },
        Pais: { type: String },
        Estado: { type: String },
        Municipio: { type: String },
        Localidad: { type: String },
        Colonia: { type: String },
        detail_row: {
          Activo: { type: String },
          Borrado: { type: String },
          detail_row_reg: [
            {
              FechaReg: { type: Date, default: Date.now },
              UsuarioReg: { type: String },
            },
          ],
        },
      },
    ],
    detail_row: {
      Activo: { type: String },
      Borrado: { type: String },
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
  "cat_personas",
  etiquetasSchema,
  conn,
  dbName,
  dbCluster
);

export default model;
