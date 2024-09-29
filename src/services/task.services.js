const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../../utils/esHelper");

class TaskServices {
  getAll = async () => {
    let tasksResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("task");

      const cursor = collection.find();
      tasksResp = await cursor.toArray();
    } finally {
      return tasksResp;
    }
  };

  getAllByQuery = async (query) => {
    let tasksResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("task");

      if (!esIsEmpty(query)) {
        const cursor = collection.find(query);
        tasksResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        tasksResp = await cursor.toArray();
      }
    } finally {
      return tasksResp;
    }
  };

  getOne = async (id) => {
    let resptask = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("task");

      const filter = { _id: new ObjectId(id) };

      resptask = await collection.findOne(filter);
    } catch (error) {
      console.log("task By ID Error, ", error);
    } finally {
      return resptask;
    }
  };

  addOne = async (task) => {
    let taskResult = null;
    try {
      const collection = dbClient.db("hr_app").collection("task");

      task.create = new Date();
      taskResult = await collection.insertOne(task);
    } catch (error) {
      console.log("task AddOne Error, ", error);
    } finally {
      return taskResult;
    }
  };

  updateOne = async (utask) => {
    let updateAc = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("task");

      const { _id, ...task } = utask;

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: task,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);
    } catch (error) {
      console.log("task Update ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async ({ id, user }) => {
    let resp = null;
    try {
      const database = dbClient.db("hr_app");
      const studyDb = database.collection("task");

      const query = { $and: [{ _id: new ObjectId(id) }, { userEmail: user }] };

      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("task Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const taskServices = new TaskServices();

module.exports = taskServices;
