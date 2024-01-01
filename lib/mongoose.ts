import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is missing from env variables')
    }

    if (isConnected) {
        console.log('=> using existing database connection')
        return 
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)

        isConnected = true

        console.log('=> using new database connection')

    } catch (error) {
        console.log('=> error connecting to database:', error)
    }
}