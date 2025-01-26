import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log('Attempting to create user:', user);
 
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      '6476476476',  // Check if this is the correct phone number or should be dynamic
      user.name
    );

    console.log('New user created:', newuser);
    return parseStringify(newuser);

  } catch (error: any) {
    console.error('Error creating user:', error);

    if (error?.code === 409) {
      // Handle the case where the user already exists
      console.log('User already exists. Checking for existing user...');
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      console.log('Existing user found:', existingUser);
      return existingUser.users[0];  // Return the existing user
    }

    console.error('An unknown error occurred:', error);
  }
};
