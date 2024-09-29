
const { esIsEmpty } = require("../../utils/esHelper");
const respFormat = require("../../utils/response/respFormat");
const workSheetServices = require("../services/work.sheet.services");


class WorkSheetController {
  getAll = async (req, resp) => {
    try {
      const workSheets = await workSheetServices.getAll();
      resp.status(200);

      if (!esIsEmpty(workSheets)) {
        resp.send(
          respFormat(workSheets, `${workSheets?.length} workSheets found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` workSheets not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` workSheets not found`, true));
    }
  };

  getAllByQuery = async (req, resp) => {
    try {
      const workSheets = await workSheetServices.getAllByQuery(
        req.query?.level
      );
      resp.status(200);

      if (!esIsEmpty(workSheets)) {
        resp.send(
          respFormat(
            workSheets,
            `${workSheets?.length} workSheets found By Query`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` workSheets not found By Query`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` workSheets not found`, true));
    }
  };

  getOne = async (req, resp) => {
    // console.log("workSheet Get One ...User, ", req.user);

    const workSheet = await workSheetServices.getOne(req?.params?.id);

    try {
      if (!esIsEmpty(workSheet)) {
        resp
          .status(200)
          .send(respFormat(workSheet, "workSheet found by ID", true));
      } else {
        resp

          .status(200)
          .send(respFormat(workSheet, "workSheet not found", false));
      }
    } catch (error) {
      resp.status(202).send(respFormat(null, "workSheets not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const workSheet = await workSheetServices.addOne(req.body);
      resp.status(200);
      if (!esIsEmpty(workSheet)) {
        resp.send(respFormat(workSheet, "workSheet added  successfully", true));
      } else {
        resp.send(respFormat(workSheet, "workSheet Add  failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "workSheets Add failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const workSheet = await workSheetServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(workSheet)) {
        resp.send(respFormat(workSheet, "workSheet Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "workSheets Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await workSheetServices.deleteOne({
        id: req?.params.id,
        user: req?.user?.userEmail,
      });
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "workSheet Delete/Remove successfully", true)
        );
      }
    } catch (error) {
      console.log("workSheet Delete Error ", error);
      resp.send(respFormat(null, "workSheet  Delete/Remove failed", false));
    }
  };
}

const workSheetController = new WorkSheetController();

module.exports = workSheetController;
