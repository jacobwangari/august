const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getActivitiesCollection } = require('../config/db');
const { ObjectId } = require('mongodb'); // Ensure this is correctly required


// Get today's activities for a user
router.get('/activities/today', verifyToken, async (req, res) => {
  try {
    const activitiesCollection = getActivitiesCollection();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Start of the next day

    const activities = await activitiesCollection.find({
      userId: new ObjectId(req.user.userId),
      'activities.startTime': {
        $gte: today.toISOString(),
        $lt: tomorrow.toISOString(),
      }
    }).toArray();

    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found for today' });
    }

    res.json(activities);
  } catch (error) {
    console.error('Error fetching today\'s activities:', error);
    res.status(500).json({ message: 'Server error' });
  }});

// Get all activities for a user
router.get('/activities', verifyToken, async (req, res) => {
  try {
    const activitiesCollection = getActivitiesCollection();
    const activities = await activitiesCollection.find({ userId: new ObjectId(req.user.userId) }).toArray();
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found for this user' });
    }
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new activity
router.post('/activities', verifyToken, async (req, res) => {
  try {
    const activitiesCollection = getActivitiesCollection();
    const { title, activities } = req.body;

    const newActivity = {
      title,
      activities,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: new ObjectId(req.user.userId),
    };

    const result = await activitiesCollection.insertOne(newActivity);
    const insertedActivity = await activitiesCollection.findOne({ _id: result.insertedId });
    res.status(201).json(insertedActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an existing activity
router.put('/activities/:id', verifyToken, async (req, res) => {
  try {
    const activitiesCollection = getActivitiesCollection();
    const { id } = req.params;
    const { title, activities } = req.body;

    const updatedActivity = {
      title,
      activities,
      updatedAt: new Date(),
    };

    const result = await activitiesCollection.updateOne(
      { _id: new ObjectId(id), userId: new ObjectId(req.user.userId) },
      { $set: updatedActivity }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Activity not found or not authorized' });
    }

    const updatedDoc = await activitiesCollection.findOne({ _id: new ObjectId(id), userId: new ObjectId(req.user.userId) });
    res.json(updatedDoc);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an activity
router.delete('/activities/:id', verifyToken, async (req, res) => {
  try {
    const activitiesCollection = getActivitiesCollection();
    const { id } = req.params;

    const result = await activitiesCollection.deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user.userId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Activity not found or not authorized' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
