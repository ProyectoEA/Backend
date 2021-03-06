//Configuraciones para conexion con BBDD
export default {
    DB: {

        //URI: process.env.MONGODB_URI || 'mongodb://localhost/proyectoEA',
        URI: process.env.MONGODB_URI || 'mongodb://147.83.7.156:27017/bbdd',
    },
    jwtSecret: 'chulibobito',
    defaultImage: 'https://res.cloudinary.com/dyjz5e9a6/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1606479202/default%20images/default_ktlol4.png',
    letrasNombreGrupos: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    letrasNombreVueltas: ['A1','A2','B1','B2','C1','C2','D1','D2','E1','E2','F1','F2']
}

