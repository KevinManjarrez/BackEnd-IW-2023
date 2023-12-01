import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';

const ordenesSchemaPWA = new mongoose.Schema({
	
		IdOrdenOK:{type : String},
		IdOrdenBK: {type : String},
		IdTipoOrdenOK: {type : String},
		IdRolOK: {type : String},
		IdPersonaOK: {type : Number},
		ordenes_estatus: [
		  {
			IdTipoEstatusOK: {type : String},
			Actual: {type : String},
			Observacion: {type : String},
			detail_row: {
				Activo: { type: String, default: 'S' },
				Borrado: { type: String, default: 'N' },
			  	detail_row_reg: [
					{
						FechaReg: { type: Date, default: Date.now },
						UsuarioReg: { type: String },
					}
			  ]
			},
			_id: false
		  },
		],
		ordenes_info_ad: [
		  {
			IdEtiquetaOK: { type: String },
			IdEtiqueta: { type: String },
			Etiqueta: { type: String },
			Valor: { type: String },
			IdTipoSeccionOK: { type: String },
			Secuencia: { type: Number },
			detail_row: {
				Activo: { type: String, default: 'S' },
				Borrado: { type: String, default: 'N' },
			  	detail_row_reg: [
					{
						FechaReg: { type: Date},
						UsuarioReg: { type: String },
					}
			  ]
			},
			_id: false
		  },
		],
});

const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('cat_institutes', 
							ordenesSchemaPWA,
						  conn, 
						  dbName, 
						  dbCluster);

export default model;