import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,  // timeout after 5s if can't connect
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Atlas connection error:', error);
    process.exit(1);
  }
};

export default connectDB;