const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function initializeMongoServer() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on("error", (e) => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });
}

async function stopMongoServer() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

async function clearMongoServer() {
  const collections = mongoose.connection.collection;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

module.exports = { initializeMongoServer, stopMongoServer, clearMongoServer };
