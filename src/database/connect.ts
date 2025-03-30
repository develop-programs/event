import mongoose from "mongoose";

// Connection options for better reliability
const connectionOptions: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

/**
 * Establishes a connection to MongoDB using the provided environment variable.
 * Returns the connection instance if successful.
 */
export async function connect(): Promise<typeof mongoose | undefined> {
  try {
    // Return existing connection if already connected
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB connection already established");
      return mongoose;
    }

    // Connect to database
    const connection = await mongoose.connect(
      process.env.DATABASE_URL as string,
      connectionOptions
    );

    console.log("Connected to MongoDB successfully");

    // Add event listeners for connection issues
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    return connection;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to connect to MongoDB:", error.message);
    } else {
      console.error("Failed to connect to MongoDB:", String(error));
    }
    // Let the caller handle the error
    throw error;
  }
}

/**
 * Closes the MongoDB connection gracefully.
 */
export async function disconnect(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log("MongoDB already disconnected");
      return;
    }

    await mongoose.disconnect();
    console.log("MongoDB disconnected successfully");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to disconnect from MongoDB:", errorMessage);
    throw error;
  }
}

/**
 * Checks if the database connection is active.
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
