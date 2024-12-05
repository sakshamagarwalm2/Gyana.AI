import mongoose from 'mongoose';

async function connectToDatabase() {
    try{
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to MongoDB');
    }
    catch(err){
        console.error('Failed to connect to MongoDB:', err);
    }
  
}

async function disconnectFromDatabase() {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
  
  export { connectToDatabase, disconnectFromDatabase };