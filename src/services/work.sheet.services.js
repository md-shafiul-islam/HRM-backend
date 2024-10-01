const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../../utils/esHelper");
const { use } = require("../router/user.router");

class WorkSheetServices {
  getAll = async () => {
    let workSheetsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("work_sheet");

      const cursor = collection.find();
      workSheetsResp = await cursor.toArray();
    } finally {
      return workSheetsResp;
    }
  };

  getAllByQuery = async (query) => {
    let workSheetsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("work_sheet");

      if (!esIsEmpty(query)) {
        const cursor = collection.find(query);
        workSheetsResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        workSheetsResp = await cursor.toArray();
      }
    } finally {
      return workSheetsResp;
    }
  };

  getOne = async (id) => {
    let respworkSheet = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("work_sheet");

      const filter = { _id: new ObjectId(id) };

      respworkSheet = await collection.findOne(filter);
    } catch (error) {
      console.log("workSheet By ID Error, ", error);
    } finally {
      return respworkSheet;
    }
  };

  addOne = async (workSheet, email) => {
    let workSheetResult = null;

    try {
      const collection = dbClient.db("hr_app").collection("work_sheet");
      workSheet.userEmail = email;
      workSheet.create = new Date();
      workSheetResult = await collection.insertOne(workSheet);
    } catch (error) {
      console.log("workSheet AddOne Error, ", error);
    } finally {
      return workSheetResult;
    }
  };

  updateOne = async (uworkSheet) => {
    let updateAc = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("work_sheet");

      const { _id, ...workSheet } = uworkSheet;

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: workSheet,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);
    } catch (error) {
      console.log("workSheet Update ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async ({ id, user }) => {
    let resp = null;
    try {
      const database = dbClient.db("hr_app");
      const studyDb = database.collection("work_sheet");

      const query = { $and: [{ _id: new ObjectId(id) }, { userEmail: user }] };

      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("workSheet Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const workSheetServices = new WorkSheetServices();

module.exports = workSheetServices;
