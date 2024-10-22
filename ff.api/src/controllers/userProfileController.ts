import { Request, Response } from 'express';
import Onboarding, { OnboardingStatus } from '../models/userProfile';

// Create user profile
const createUserProfile = async (req: Request, res: Response) => {

  try {
    const userId = req.body.userId;

    const newUserProfile = new Onboarding({
      userId,
    });
    await newUserProfile.save();

    res.status(201).json(newUserProfile);
  } catch (error) {
    res.status(500).json({ message: 'test', error });
  }
};

// Get user profile
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const userProfile = await Onboarding.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user profile
const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const updatedUserProfile = await Onboarding.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUserProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(updatedUserProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Delete user profile
const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const deletedUserProfile = await Onboarding.findOneAndDelete({ userId });

    if (!deletedUserProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export {
  getUserProfile,
  updateUserProfile,
  createUserProfile,
  deleteUserProfile
};