const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function createDatabase() {
  const uri = 'mongodb://localhost:27017/myNewDatabase';

  try {
    // Connect to the MongoDB server
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Define a schema and model for the collection
    const exampleSchema = new mongoose.Schema({
      name: String,
    });
    const Example = mongoose.model('Example', exampleSchema);

    // Create a new document
    const doc = new Example({ name: 'example' });
    await doc.save();

    console.log('Database and collection created');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

createDatabase();
