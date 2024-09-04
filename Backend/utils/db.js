import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Ensure MONGO_URI is set in your environment variables
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (error) {
        // Log the error with details
        console.error('Error connecting to the database:', error.message);
    }
};

export default connectDB;
