const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../../utils/esHelper");
const e = require("express");

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

  getAllByRole = async (role) => {
    let usersResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const cursor = collection.find({ role });
      usersResp = await cursor.toArray();
    } finally {
      return usersResp;
    }
  };

  getAllByQuery = async (query) => {
    let usersResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const cursor = collection.find(query);
      usersResp = await cursor.toArray();
    } finally {
      return usersResp;
    }
  };

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
    console.log("User Finding using id ", id);
    let respUser = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const filter = { _id: new ObjectId(id) };

      respUser = await collection.findOne(filter);
      console.log("User ", respUser);
    } catch (error) {
      // console.log("User By ID Error, ", error);
    } finally {
      return respUser;
    }
  };

  getByUserName = async (email) => {
    let respUser = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      respUser = await collection.findOne({ email });
    } catch (error) {
      console.log("User By User Name Error, ", error);
    } finally {
      return respUser;
    }
  };

  addOne = async (user) => {
    let userResult = null;

    try {
      const collection = dbClient.db("hr_app").collection("user");

      const filter = { $or: [{ email: user.email }, { autId: user.autId }] };

      const respUser = await collection.findOne(filter);

      if (!this.isUserExist(respUser)) {
        user.create = new Date();
        userResult = await collection.insertOne(user);
      }
    } catch (error) {
      console.log("User AddOne Error, ", error);
    } finally {
      return userResult;
    }
  };

  userUpdate = async (uUser) => {
    console.log("Update ...", uUser);

    let update = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const { _id, ...user } = uUser;
      const filter = { _id: new ObjectId(_id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: user,
      };
      // Update the first document that matches the filter
      update = await collection.updateOne(filter, updateDoc);
      console.log("Update User ", update);
    } catch (error) {
      console.log("User Update Error, ", error);
    } finally {
      // Close the connection after the operation completes
      return update;
    }
  };

  updateOnly = async (uUser) => {
    console.log("Update ...", uUser);

    let update = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("user");

      const { id, ...user } = uUser;
      const filter = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: user,
      };
      // Update the first document that matches the filter
      update = await collection.updateOne(filter, updateDoc);
      console.log("Update User ", update);
    } catch (error) {
      console.log("User Update Error, ", error);
    } finally {
      // Close the connection after the operation completes
      return update;
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

  isUserExist = (user) => {
    if (!esIsEmpty(user)) {
      return true;
    }

    return false;
  };
}

const userServices = new UserServices();

module.exports = userServices;
