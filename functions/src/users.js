import { FieldValue } from 'firebase-admin/firestore'
import { db } from './dbconnect.js'

const collection = db.collection('users')

export async function signup(req, res) {
 const { email, password } = req.body
 if(!email || !password.lenght > 6) {
    res.status(400).send({message: "Emaill and password are both required. Password must be 6 characters or more"})
    return
}
 // TODO: check if email is already in use
 const newUser = {
    email: email.toLowerCase(),
    password,
    createdAt: FieldValue.serverTimestamp(),
 }
 await collection.add(newUser)
 // once user is added... log them in 
login(req,res)
}

export async function login(req, res){
const { email, password } = req.body
if(!email || !password) {
    res.status(400).send({message: "Emsil and password are bith required."})
    return
}
const users = await collection
.where("email", "==", email.toLowerCase())
.where("password", "==", password)
.get()
let user = users.docs.map(doc => ({...doc.data(), id: doc.id}))[0] // id automatically generated at signup
if(!user) {
    res.status(400).send({message: "Invalid email and/or password."})
}
delete user.password
res.send(user) // { email, createAt, id }

}
