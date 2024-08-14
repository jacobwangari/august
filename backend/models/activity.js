const { ObjectId } = require('mongodb');

const createActivitiesSchema = (db) => {
  const schema = {
    title: String,
    activities: [
      {
        name: String,
        description: String,
        startTime: Date,
        endTime: Date,
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: ObjectId, // The ID of the user who created the activity
  };

  return db.collection('activities');
};

module.exports = { createActivitiesSchema };
