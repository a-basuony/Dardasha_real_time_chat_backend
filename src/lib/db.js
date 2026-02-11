import mongoose from "mongoose";

// Keep track of the connection state
let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = !!conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in connecting to MongoDB", error);
    // Remove process.exit(1) - it can crash the Vercel container
    throw error;
  }
};

// import mongoose from "mongoose";

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log("Error in connecting to MongoDB", error);
//     process.exit(1); // 1 means failure
//   }
// };
