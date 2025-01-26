import * as sdk from "node-appwrite";

const {
  NEXT_PUBLIC_ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID,
} = process.env;

// Debugging the environment variables
console.log("Appwrite endpoint:", NEXT_PUBLIC_ENDPOINT);
console.log("Appwrite project ID:", PROJECT_ID);
console.log("Appwrite API key:", API_KEY);

// Check if the required env variables are loaded
if (!NEXT_PUBLIC_ENDPOINT || !PROJECT_ID || !API_KEY) {
 // throw new Error("Appwrite environment variables are missing.");
}

const client = new sdk.Client();

client.setEndpoint(NEXT_PUBLIC_ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

// Initialize the services
export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);

// Sample usage: Create a user
export const createUser = async (userData:  CreateUserParams) => {
  try {
    const newUser = await users.create(
      sdk.ID.unique(),           // Unique user ID
      userData.email,            // User email
      userData.phone,            // User phone number
      '6476476476',              // Your phone number (e.g., a default one or a country code for testing)
      userData.name              // User name
    );
    console.log(newUser);
    return newUser;
  } catch (error) {
    //console.error("Error creating user:", error);
  }
};
