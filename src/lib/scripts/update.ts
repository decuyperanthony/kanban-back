const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {
  useUnifiedTopology: true,
});

/**
 * Updates all documents in a MongoDB collection with a specified update operation.
 * `node ./src/lib/scripts/update.ts`
 *
 * @param {string} collectionName - The name of the collection.
 * @param {object} updateOperation - The update operation to perform on all documents.
 * @returns {Promise<number>} - A promise that resolves to the number of updated documents.
 */
async function updateAllDocuments(
  // @ts-ignore
  collectionName,
  // collectionName: string,
  // @ts-ignore
  updateOperation
  // updateOperation: object
) {
  try {
    await client.connect();

    const database = client.db();
    const collection = database.collection(collectionName);

    const updateQuery = {}; // Update all documents

    const updateResult = await collection.updateMany(
      updateQuery,
      updateOperation
    );

    return updateResult.modifiedCount;
  } catch (err) {
    console.error("Error:", err);
    return 0;
  } finally {
    await client.close();
  }
}

(async () => {
  const collectionName = "tasks";
  const updateOperation = { $set: { status: "NONE" } }; // Set the status field to 'NONE'

  const updatedDocumentsCount = await updateAllDocuments(
    collectionName,
    updateOperation
  );

  console.log(`Updated ${updatedDocumentsCount} documents in the collection.`);
})();
