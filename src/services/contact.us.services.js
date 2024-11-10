const { ObjectId } = require("mongodb");
const { dbClient } = require("../database/dbClient");
const { esIsEmpty } = require("../../utils/esHelper");

class ContactUsServices {
  getAll = async () => {
    let contactUsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("contact_us");

      const cursor = collection.find();
      contactUsResp = await cursor.toArray();
    } finally {
      return contactUsResp;
    }
  };

  getAllByQuery = async (query) => {
    let contactUsResp = [];
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("contact_us");

      if (!esIsEmpty(query)) {
        const cursor = collection.find(query);
        contactUsResp = await cursor.toArray();
      } else {
        const cursor = collection.find();
        contactUsResp = await cursor.toArray();
      }
    } finally {
      return contactUsResp;
    }
  };

  getOne = async (id) => {
    let respContactUs = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbClient.db("hr_app");
      const collection = database.collection("contact_us");

      const filter = { _id: new ObjectId(id) };

      respContactUs = await collection.findOne(filter);
    } catch (error) {
      console.log("contactUs By ID Error, ", error);
    } finally {
      return respContactUs;
    }
  };

  addOne = async (contactUs) => {
    let contactUsResult = null;
    console.log("Contact Us Message Added contactUs, ", contactUs);

    try {
      
      const collection = dbClient.db("hr_app").collection("contact_us");

      contactUs.create = new Date();
      contactUs.isRead = false;
      contactUsResult = await collection.insertOne(contactUs);
      console.log("Contact Us Message Added ", contactUsResult);
    } catch (error) {
      console.log("contactUs AddOne Error, ", error);
    } finally {
      return contactUsResult;
    }
  };

  updateOne = async (ucontactUs) => {
    let updateAc = null;
    try {
      const database = dbClient.db("hr_app");
      const collection = database.collection("contact_us");

      const { _id, ...contactUs } = ucontactUs;

      const filter = { _id: new ObjectId(_id) };

      const updateDoc = {
        $set: contactUs,
      };
      // Update the first document that matches the filter
      updateAc = await collection.updateOne(filter, updateDoc);
    } catch (error) {
      console.log("contactUs Update ", error);
    } finally {
      // Close the connection after the operation completes

      return updateAc;
    }
  };

  deleteOne = async ({ id, user }) => {
    let resp = null;
    try {
      const database = dbClient.db("hr_app");
      const studyDb = database.collection("contact_us");

      const query = { $and: [{ _id: new ObjectId(id) }, { userEmail: user }] };

      resp = await studyDb.deleteOne(query);
    } catch (error) {
      console.log("contactUs Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const contactUsServices = new ContactUsServices();

module.exports = contactUsServices;
