import {Router} from "express";
import passport from "passport";
import publicacionController from '../controllers/publicacion.controller'; 

const router = Router();

router.post('/new', passport.authenticate("jwt", {session: false}), publicacionController.postPublication);
router.get('/user/:username', passport.authenticate("jwt", {session: false}), publicacionController.getPublicationsUser);
router.get('/torneo/:name', passport.authenticate("jwt", {session: false}), publicacionController.getPublicationsTorneo);
router.get('/all', passport.authenticate("jwt", {session: false}), publicacionController.getHomePublications);
router.post('/like', passport.authenticate("jwt", {session: false}), publicacionController.addLike);
router.post('/comment', passport.authenticate("jwt", {session: false}), publicacionController.addComentario);
router.post('/comments/all', passport.authenticate("jwt", {session: false}), publicacionController.getComentarios);

export default router;