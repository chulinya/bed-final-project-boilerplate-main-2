import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller to create a new user
export const createUser = async (req, res) => {
  const { username, email, password, phoneNumber, profilePicture, name } =
    req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Store the hashed password
        phoneNumber,
        profilePicture,
        name,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Controller to update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, phoneNumber, profilePicture, name } =
    req.body;

  try {
    // If password is provided, hash it
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        password: hashedPassword ? hashedPassword : undefined, // Only update password if it's provided
        phoneNumber,
        profilePicture,
        name,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
