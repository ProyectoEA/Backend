import User from '../models/user';
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from '../config/config';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, next) => {
    try{
        const user = await User.findById(payload.id);
        if(user){
            console.log("PASSPORT DEVUELVE: ", user.toJSON());
            //El usuario decodificado se inserta en req.user
            let id = user.id;
            return next(null, id);
        }
        console.log('Hay un error');
        return next(null, false, {message: "User not found"});
    } catch (error) {
        console.log(error);
        return next(error);
    }
});