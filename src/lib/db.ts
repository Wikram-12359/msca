import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI!

if(!MONGO_URI){
  throw new Error("MONGO_URI is not defined in environment variables")
}

let cached = global.mongoose

if(!cached){
  cached = global.mongoose = {connection: null, promise: null}
}

export const connectDB = async () => {
  if(cached.connection){
    return cached.connection
  }

  if(!cached.promise){
    const options = {
      bufferCommands: true,
      maxPoolSize: 10,
    }
    cached.promise = mongoose.connect(MONGO_URI, options).then(mongoose => {
      return mongoose.connection
    })
  }

  try{
    cached.connection = await cached.promise
  }catch (error){
    cached.promise = null
    throw error
  }
  return cached.connection
}