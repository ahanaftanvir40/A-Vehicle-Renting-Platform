import mongoose from "mongoose";
import config from 'config'
import dbgr from 'debug'



//"MONGODB_URI": "mongodb://localhost:27017/wheelzonrent"
mongoose.connect(`${config.get('MONGODB_URI')}`)
    .then(() => {
        console.log(`connected`) //add dbgr later
    })
    .catch((err) => {
        dbgr(err)
    })

export const db = mongoose.connection