import { IStatistics } from './statistics';
/* nombre, descripcion, url, responsable */
import mongoose, { Schema, Document} from 'mongoose';

//Modelo de objeto que se guarda en la BBDD de MongoDB
let torneoSchema = mongoose.Schema;
const torneo = new torneoSchema({
    name: {
        type: String
    },
    type: { // Publico o privado
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    fechaInicio: {
        type: Date
    },
    torneoIniciado: {
        type: Boolean
    },
    finInscripcion: {
        type: Date
    },
    ubicacion: {

        name:{
            type:String
        },
        type: { //"Point"
            type: String
        },
        // [{lat: '4.3', lng: '5.8'}]
        // [4.3, 5.8]
        coordinates: [{
            type: Number,
        }]
    },
    reglamento: { // FOTO
        type: String
    },
    numRondas: {
        type: Number
    },
    duracionRondas: {
        type: Number
    },
    admin: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxPlayers: {
        type: Number
    },
    finalizado: {
        type: Boolean
    },
    ganador: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    cola: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    sobra: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    partidosConfirmados: {
        type: Number
    },
    rondas: [{
        name: {
            type: String
        },
        fechaFin: {
            type: Date
        },
        grupos: [{
            groupName: {
                type: String
            },
            classification: [{
                player: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                statistics: {
                    type: Object,
                    ref: 'Statistics'
                }
            }],
            partidos: [{
                type: Schema.Types.ObjectId,
                ref: 'Partido'
            }],
            chat: {
                type: Schema.Types.ObjectId,
                ref: 'Chat'
            }
        }]
    }],
    previa: {
        fechaFin: {
            type: Date
        },
        grupos: [{
            groupName: {
                type: String
            },
            classification: [{
                player: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                statistics: {
                    type: Object,
                    ref: 'Statistics'
                }
            }],
            partidos: [{
                type: Schema.Types.ObjectId,
                ref: 'Partido'
            }],
            chat: {
                type: Schema.Types.ObjectId,
                ref: 'Chat'
            } 
        }]
    },
    publicaciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Publicacion'
    }]
});

//Interfaz para tratar respuesta como documento
export interface ITorneo extends Document {
    /* _id: string; */
    name: string;
    type: string;
    description: string;
    image: string;
    fechaInicio: Date;
    torneoIniciado: boolean;
    finInscripcion: Date;
    ubicacion: string;
    reglamento: string;
    numRondas: number;
    duracionRondas: number;
    admin: Array<any>;
    maxPlayers: number;
    finalizado: boolean;
    ganador: any;
    players: Array<any>;
    cola: Array<any>;
    partidosConfirmados: number;
    rondas: Array<any>;
    previa: any;
    publicaciones: Array<any>
    torneoToJson(): JSON;
}

torneo.methods.torneoToJSON = function(){
    return {
        name: this.name,
        type: this.type,
        description: this.description,
        image: this.image,
        fechaInicio: this.fechaInicio,
        torneoIniciado: this.torneoIniciado,
        finInscripcion: this.finInscripcion,
        ubicacion: this.ubicacion,
        reglamento: this.reglamento,
        numRondas: this.numRondas,
        duracionRondas: this.duracionRondas,
        admin : this.admin,
        maxPlayers: this.maxPlayers,
        finalizado: this.finalizado,
        ganador: this.ganador,
        players : this.players,
        cola: this.cola,
        partidosConfirmados: this.partidosConfirmados,
        rondas: this.rondas,
        previa: this.previa,
        publicaciones: this.publicaciones
    };
}

torneo.index({ ubicacion: "2dsphere" });

//Exportamos modelo para poder usarlo
export default mongoose.model<ITorneo>('Torneo', torneo);