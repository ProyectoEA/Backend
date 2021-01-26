import { Request, Response } from "express";
import User, { IUser } from "../models/user"
import Publicacion from "../models/publicacion";
import Comentario, { IComentario } from "../models/comentario";

async function getMyPublications(req: Request, res: Response){
    User.findOne({"_id": req.user}, {publicaciones: 1}).populate({path: 'publicaciones', populate: {path: 'comments'}}).then((data) => {
        console.log("Get mine: ", data);
        return res.status(200).json(data);
    });
}

async function getHomePublications(req: Request, res: Response){
    let publicaciones: any = [];
    User.findOne({"_id": req.user}, {friends: 1, publicaciones: 1}).populate({path: 'friends', populate: {path: 'user', select: 'publicaciones', populate: {path: 'publicaciones'}}}).then((data) => {
        if(data==null) return res.status(404).json({message: "Friends not found"});
        data.publicaciones.forEach((publi) => {
            publicaciones.push(publi);
        })
        data.friends.forEach((friend) => {
            console.log("friend: ", friend);
            if(friend.user.publicaciones != []){
                friend.user.publicaciones.forEach((publi: any) => {
                    console.log("Publi: ", publi);
                    publicaciones.push(publi);
                });
            }
        });
        console.log(publicaciones);
        return res.status(200).json(publicaciones);
    });
}

async function postPublication(req: Request, res: Response){
    let mensaje = req.body.mensaje;
    const publication = new Publicacion({
        user: req.user,
        mensaje: mensaje,
        likes: [],
        comments: [],
        date: Date.now()
    });
    publication.save().then((publi) => {
        User.updateOne({"_id": req.user}, {$addToSet: {publicaciones: publi._id}}).then((data) => {
            console.log(data);
            return res.status(200).json(data);
        })
    })
}

async function addLike(req: Request, res: Response){
    const publiID = req.body.publicacion;
    console.log("que esta pasando: ", publiID);
    Publicacion.findById(publiID).then((data: any) => {
        if(data.likes.includes(req.user)){
            data.likes.splice(data.likes.indexOf(req.user), 1);
        } else {
            data.likes.push(req.user);
        }
        Publicacion.updateOne({"_id": publiID}, {$set: {likes: data.likes}}).then((data) => {
            if(data.nModified != 1) return res.status(400).json({message: "Bad Request"});
            return res.status(200).json(data);
        })
    });
}

async function addComentario(req: Request, res: Response){ 
    const publiID = req.body.publicacion;
    const comentario = req.body.comentario;
    let comment = new Comentario({
        publicacion: publiID,
        date: Date.now(),
        user: req.user,
        comentario: comentario
    });

    comment.save().then((data) => {
        console.log("Comment: ", data);
        if(data == null) return res.status(400).json({message: "Error al añadir el comentario"});
        let commentID = data._id;
        Publicacion.updateOne({"_id": publiID}, {$addToSet: {comments: commentID}}).then((data) => {
            if(data.nModified != 1) return res.status(404).json({message: "Bad request"});
            return res.status(200).json(data);
        })
    });
}

async function getComentarios(req: Request, res: Response){
    const publiID = req.body.publicacion;

    Publicacion.findOne({"_id": publiID}, {comments: 1}).populate('comments').then((data) => {
        if(data == null) return res.status(404).json({message: "Publicacion not found"});
        return res.status(200).json(data);
    });
}

export default { getMyPublications, postPublication, getHomePublications, addLike, addComentario, getComentarios }