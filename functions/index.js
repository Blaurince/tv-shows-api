import functions from 'firebase-functions'
import  express  from 'express'
import cors from 'cors'
import { login, signup } from './src/users.js'
import { getShows, addShow, deleteShow} from './src/shows.js'

const app = express() // creates our express app
app.use(cors())
app.use(express.json())

// ROUTES GO HERE
app.post("/signup", signup)
app.post("/login", login)

// Show Routes
app.get("/shows", getShows)
app.post("/shows", addShow) // we want to protect
app.delete("/shows/:showId", deleteShow);

// lets us run locally without amulators
//app.listen(3001, () => console.log(`Listening on http:localhost...`))
// http://localhost:3000
export const api = functions.https.onRequest(app) // export our cloud function
