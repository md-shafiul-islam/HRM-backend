const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");

class UserServices {
  getAll = async () => {
    let usersResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const cursor = collection.find();
      usersResp = await cursor.toArray();
    } finally {
      return usersResp;
    }
  };

  getOne = async (id) => {
    // console.log("User Finding using id ", id);
    let respUser = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const filter = { _id: new ObjectId(uSubmission.id) };

      respUser = await collection.findOne(filter);
    } catch (error) {
      // console.log("User By ID Error, ", error);
    } finally {
      return respUser;
    }
  };

  addOne = async (user) => {
    let userResult = null;

    try {
      const collection = dbClient.db("hr_app").collection("user");

      user.create = new Date();
      userResult = await collection.insertOne(user);
    } catch (error) {
      console.log("User AddOne Error, ", error);
    } finally {
      return userResult;
    }
  };

  userUpdate = async (uUser) => {
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const filter = { _id: new ObjectId(uUser.id) };

      const options = { upsert: true };

      const { name, email, profileURL } = uUser;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      const result = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes
    }
  };

  deleteOne = async (id) => {
    let resp = null;
    try {
      const database = dbConnectionClient.db("hr_app");
      const studyDb = database.collection("user");

      const query = { _id: new ObjectId(id) };
      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("Quote Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const userServices = new UserServices();

module.exports = userServices;
