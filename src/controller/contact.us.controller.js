const { esIsEmpty } = require("../../utils/esHelper");
const respFormat = require("../../utils/response/respFormat");
const contactUsServices = require("../services/contact.us.services");

class ContactUsController {
  getAll = async (req, resp) => {
    try {
      const contactUs = await contactUsServices.getAll();
      resp.status(200);

      if (!esIsEmpty(contactUs)) {
        resp.send(
          respFormat(contactUs, `${contactUs?.length} contactUs found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` contactUs not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` contactUs not found`, true));
    }
  };

  getAllByQuery = async (req, resp) => {
    try {
      const contactUs = await contactUsServices.getAllByQuery(req.query?.level);
      resp.status(200);

      if (!esIsEmpty(contactUs)) {
        resp.send(
          respFormat(
            contactUs,
            `${contactUs?.length} contactUs found By Query`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` contactUs not found By Query`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` contactUs not found`, true));
    }
  };

  getOne = async (req, resp) => {
    // console.log("contactUs Get One ...User, ", req.user);

    const contactUs = await contactUsServices.getOne(req?.params?.id);

    try {
      if (!esIsEmpty(contactUs)) {
        resp
          .status(200)
          .send(respFormat(contactUs, "contactUs found by ID", true));
      } else {
        resp

          .status(200)
          .send(respFormat(contactUs, "contactUs not found", false));
      }
    } catch (error) {
      resp.status(202).send(respFormat(null, "contactUs not found", false));
    }
  };

  add = async (req, resp) => {
    console.log("Contact US Add Message ", req.body);
    try {
      const contactUs = await contactUsServices.addOne(req.body);
      resp.status(200);
      if (!esIsEmpty(contactUs)) {
        resp.send(respFormat(contactUs, "Message received  successfully", true));
      } else {
        resp.send(respFormat(contactUs, "contactUs Add  failed", false));
      }
    } catch (error) {
      console.log("Contact US Error ", error);
      resp.send(respFormat(null, "contactUs Add failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const contactUs = await contactUsServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(contactUs)) {
        resp.send(respFormat(contactUs, "contactUs Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "contactUs Update failed", false));
    }
  };

  onlyUpdate = async (req, resp) => {
    try {
      const contactUs = await contactUsServices.onlyUpdate(req.body);
      resp.status(200);

      if (!esIsEmpty(contactUs)) {
        resp.send(respFormat(contactUs, "contactUs Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "contactUs Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await contactUsServices.deleteOne({
        id: req?.params.id,
        user: req?.user?.userEmail,
      });
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "contactUs Delete/Remove successfully", true)
        );
      }
    } catch (error) {
      console.log("contactUs Delete Error ", error);
      resp.send(respFormat(null, "contactUs  Delete/Remove failed", false));
    }
  };
}

const contactUsController = new ContactUsController();

module.exports = contactUsController;
