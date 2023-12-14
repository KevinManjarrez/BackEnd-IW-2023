import * as mongoose from "mongoose";
import config from "../../../config/config";
import obtenerConexion from "../../../config/connectionsFactory";
import obtenerModelo from "../../../config/modelsFactory";


const instituteSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  IdInstitutoOK: { type: String },
  IdInstitutoBK: { type: String },
  IdInstitutoPA: { type: String },
  DesInstituto: { type: String },
  Alias: { type: String },
  Matriz: { type: String },
  IdTipoGiroOK: { type: String },
  cat_negocios: [{
    IdNegocioOK: { type: String },
    IdNegocioBK: { type: String },
    DesNegocio: { type: String },
    Alias: { type: String },
    Matriz: { type: String },
    info_ad: [{
      IdEtiquetaOK: { type: String },
      IdEtiqueta: { type: String },
      Etiqueta: { type: String },
      Valor: { type: String },
      IdTipoGrupoOK: { type: String },
      IdTipoSeccionOK: { type: String },
      Secuencia: { type: Number },
      detail_row: {
        Activo: { type: String },
        Borrado: { type: String },
        detail_row_reg: [{
          FechaReg: { type: Date },
          UsuarioReg: { type: String },
        }],
      },
    }],
    archivos: [{
      DesArchivo: { type: String },
      RutaArchivo: { type: String },
      IdTipoArchivoOK: { type: String },
      IdTipoSeccionOK: { type: String },
      Secuencia: { type: Number },
      Principal: { type: String },
      detail_row: {
        Activo: { type: String },
        Borrado: { type: String },
        detail_row_reg: [{
          FechaReg: { type: Date },
          UsuarioReg: { type: String },
        }],
      },
    }],
    telefonos: [{
      DesTelefono: { type: String },
      CodPais: { type: String },
      NumTelefono: { type: String },
      NumExtension: { type: String },
      Principal: { type: String },
      IdTipoTelefonoOK: { type: String },
      detail_row: {
        Activo: { type: String },
        Borrado: { type: String },
        detail_row_reg: [{
          FechaReg: { type: Date },
          UsuarioReg: { type: String },
        }],
      },
    }],
    dir_webs: [{
      DesDirWeb: { type: String },
      DireccionWeb: { type: String },
      IdTipoDirWebOK: { type: String },
      Principal: { type: String },
      detail_row: {
        FechaReg: { type: Date },
        UsuarioReg: { type: String },
        FechaUltMod: { type: Date },
        UsuarioMod: { type: String },
        Activo: { type: String },
        Borrado: { type: String },
      },
    }],
    domicilios: [{
      DesDomicilio: { type: String },
      CalleNumero: { type: String },
      EntreCalle1: { type: String },
      EntreCalle2: { type: String },
      Referencia: { type: String },
      CodPostal: { type: String },
      Principal: { type: String },
      CoordenadasXY: { type: String },
      IdTipoDomicilioOK: { type: String },
      Pais: { type: String },
      Estado: { type: String },
      Municipio: { type: String },
      Localidad: { type: String },
      Colonia: { type: String },
      detail_row: {
        Activo: { type: String },
        Borrado: { type: String },
        detail_row_reg: [{
          FechaReg: { type: Date },
          UsuarioReg: { type: String },
        }],
      },
    }],
    detail_row: {
      Activo: { type: String },
      Borrado: { type: String },
      detail_row_reg: [{
        FechaReg: { type: Date },
        UsuarioReg: { type: String },
      }],
    },
  }],
  detail_row: {
    Activo: { type: String },
    Borrado: { type: String },
    detail_row_reg: [{
      FechaReg: { type: Date },
      UsuarioReg: { type: String },
    }],
  },
});


const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;

const conn = obtenerConexion(dbName, dbCluster);

const model = obtenerModelo(
  "cat_institutes",
  instituteSchema,
  conn,
  dbName,
  dbCluster
);

export default model;
