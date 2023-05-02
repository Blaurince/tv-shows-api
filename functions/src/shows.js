import { FieldValue } from "firebase-admin/firestore";
import jwt from "jsonwebtoken"
import { db } from "./dbconnect.js";
import { secretKey }from "../secrets.js"


const collection = db.collection("shows");

export async function getShows(req, res) {
    const showsCollection = await collection.get()
    const shows = showsCollection.docs.map(doc => ({...doc.data(), id: doc.id}) )
    res.send(shows)
} 

export async function deleteShow(req, res) {
    const {showId} = req.params
    await collection.doc(showId).delete()
    getShows(req, res)
}

export async function addShow(req,res) {
    const token = req.headers.authorization
    if(!token){
        res.status(401).send({message: "Unauthorized. A valid token is required."})
    }
    const decoded = jwt.verify(token, secretKey)
    res.status(401).send({message: " A valid token is required."})
    return
    }

    res.status
    const { title, poster, seasons } = req.body
    if(!title || !poster || !seasons) {
        res.status(400).send({message: "Show title, poster, seasons are required." })
        return
    }


    const newShow = {
        title,
        poster,
        seasons,
        createdAt: FieldValue.serverTimestamp(),
    }
    await collection.add(newShow) // add the new show
    getShows(req,res) // return the updated list

