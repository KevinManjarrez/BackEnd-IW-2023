import * as mongoose from 'mongoose';
import config from '../../../config/config';
import obtenerConexion from '../../../config/connectionsFactory';
import obtenerModelo from '../../../config/modelsFactory';


const personaSchema = new mongoose.Schema({
	IdPersonaOK: { type: String },
	IdPersonaBK: { type: String },
	Nombre: { type: String },
	ApPaterno: { type: String },
	ApMaterno: { type: String },
	RFC: { type: String },
	CURP: { type: String },
	FechaNac: { type: Date, default: Date.now },
	IdTipoPersonaOK: { type: String },
	Sexo: { type: String },
	Alias: { type: String },
	cat_personas_telefonos: [
		{
			_id: false,
			DesTelefono: {type : String},
			CodPais: { type: String },
			NumTelefono: { type: String },
			NumExtension: { type: String },
			Principal: { type: String },
			IdTipoTelefonoOK: { type: String },
			detail_row: {
				_id: false,
				Activo: {type : String, default : 'S'},
				Borrado: {type : String, default : 'N'},
				detail_row_reg: [
					{
						_id: false,
						FechaReg: {type : Date, default: Date.now},
						UsuarioReg: {type : String, default: 'SYSTEM'}
					}
				]
			}
		}
	],
	cat_personas_dir_webs: [
		{
			_id: false,
			DesDirWeb: { type: String },
			DireccionWeb: { type: String },
			IdTipoDirWebOK: {type : String},
			Principal: { type: String },
			detail_row: {
				_id: false,
				Activo: {type : String, default : 'S'},
				Borrado: {type : String, default : 'N'},
				detail_row_reg: [
					{
						_id: false,
						FechaReg: {type : Date, default: Date.now},
						UsuarioReg: {type : String, default: 'SYSTEM'}
					}
				]
			}	
		}
	],
	cat_personas_domicilios: [
		{
			_id: false,
			DesDomicilio: { type: String },
			CalleNumero: { type: String },
			EntreCalle1: { type: String },
			EntreCalle2: { type: String },
			Referencia: { type: String },
			CodPostal: { type: String },
			Principal: { type: String },
			CoordenadasXY: { type: String },
			IdTipoDomicilioOK: {type : String},
			Pais: { type: String },
			Estado: { type: String },
			Municipio: { type: String },
			Localidad: { type: String },
			Colonia: { type: String },
			detail_row: {
				_id: false,
				Activo: {type : String, default : 'S'},
				Borrado: {type : String, default : 'N'},
				detail_row_reg: [
					{
						_id: false,
						FechaReg: {type : Date, default: Date.now},
						UsuarioReg: {type : String, default: 'SYSTEM'}
					}
				]
			}
		}
	],
	cat_personas_info_ad: [
		{   
			_id: false,
			IdEtiquetaOK: { type: String },
			IdEtiqueta: { type: String },
			Etiqueta: { type: String },
			Valor: { type: String },
			IdTipoSeccionOK: { type: String },
			Secuencia: { type: Number },
			detail_row : {
				_id: false,
				Activo  : { type : String, default : 'S' },
				Borrado : { type : String, default : 'N' },
				detail_row_reg : [
					{
						_id: false,
						FechaReg   : { type : Date, default : Date.now() },
						UsuarioReg : { type : String, default: 'SYSTEM' }
					}
				]
			}
		}
	],
	detail_row : {
		_id: false,
		Activo  : { type : String, default : 'S' },
		Borrado : { type : String, default : 'N' },
		detail_row_reg : [
			{
				_id: false,
				FechaReg   : { type : Date, default : Date.now() },
				UsuarioReg : { type : String, default: 'SYSTEM' }
			}
		]
	}
});


//FIC: *******************************************************************
const dbName = config.DATABASE;
const dbCluster = config.CLUSTER;
  
const conn =  obtenerConexion(dbName, dbCluster);
	
const model = obtenerModelo('cat_personas', personaSchema, conn, dbName, dbCluster); 

export default model;

//export default mongoose.model('cat_personas', personaSchemaWEB, 'cat_personas');
