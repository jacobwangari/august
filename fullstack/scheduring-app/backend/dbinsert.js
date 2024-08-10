const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function createDatabaseAndInsertData() {
  const uri = 'mongodb://localhost:27017/myNewDatabase';

  try {
    // Connect to the MongoDB server
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Define a schema and model for the collection
    const exampleSchema = new mongoose.Schema({
      name: { type: String, required: true },
      age: { type: Number, required: true },
      email: { type: String, required: true }
    });
    const Example = mongoose.model('Example', exampleSchema);

    // Insert new documents
    const docs = [
      { name: 'Jacmwas ', age: 30, email: 'jacmwas@yahoo.com' },
    ];

    await Example.insertMany(docs);

    console.log('Documents inserted successfully');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection
    await mongoose.disconnect();
  }
}

createDatabaseAndInsertData();

