import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('Database connected');

        })
        connection.on('error', () => {
            console.log('Database connection failed');

        })
    } catch (error) {
        console.log(error)
    }
}