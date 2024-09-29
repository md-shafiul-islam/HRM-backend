const { ObjectId } = require("mongodb");
const { esIsEmpty } = require("../../utils/esHelper");
const { dbClient } = require("../database/dbClient");

class PaymentServices {
  getAll = async () => {
    let paymentsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("payment");

      const cursor = collection.find();
      paymentsResp = await cursor.toArray();
    } finally {
      return paymentsResp;
    }
  };

  getAllByQuery = async (query) => {
    let paymentsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("payment");

      if (!esIsEmpty(query)) {
        const cursor = collection.find(query);
        paymentsResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        paymentsResp = await cursor.toArray();
      }
    } finally {
      return paymentsResp;
    }
  };

  getOne = async (id) => {
    let resppayment = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("payment");

      const filter = { _id: new ObjectId(id) };

      resppayment = await collection.findOne(filter);
    } catch (error) {
      console.log("payment By ID Error, ", error);
    } finally {
      return resppayment;
    }
  };

  addOne = async (payment) => {
    let paymentResult = null;

    try {
      const collection = dbClient.db("hr_app").collection("payment");

      payment.create = new Date();
      paymentResult = await collection.insertOne(payment);
    } catch (error) {
      console.log("payment AddOne Error, ", error);
    } finally {
      return paymentResult;
    }
  };

  updateOne = async (upayment) => {
    let updateAc = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("payment");

      const { _id, ...payment } = upayment;

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: payment,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);
    } catch (error) {
      console.log("payment Update ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async ({ id, user }) => {
    let resp = null;
    try {
      const database = dbClient.db("hr_app");
      const studyDb = database.collection("payment");

      const query = { $and: [{ _id: new ObjectId(id) }, { userEmail: user }] };

      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("payment Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const paymentServices = new PaymentServices();

module.exports = paymentServices;
