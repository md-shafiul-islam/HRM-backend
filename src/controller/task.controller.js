const { esIsEmpty } = require("../../utils/esHelper");
const respFormat = require("../../utils/response/respFormat");
const taskServices = require("../services/task.services");

class TaskController {
  getAll = async (req, resp) => {
    try {
      const tasks = await taskServices.getAll();
      resp.status(200);

      if (!esIsEmpty(tasks)) {
        resp.send(respFormat(tasks, `${tasks?.length} tasks found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` tasks not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` tasks not found`, true));
    }
  };

  getAllByQuery = async (req, resp) => {
    try {
      const tasks = await taskServices.getAllByQuery(req.query);
      resp.status(200);

      if (!esIsEmpty(tasks)) {
        resp.send(
          respFormat(tasks, `${tasks?.length} tasks found By Query`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` tasks not found By Query`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` tasks not found`, true));
    }
  };

  getOne = async (req, resp) => {
    // console.log("task Get One ...User, ", req.user);

    const task = await taskServices.getOne(req?.params?.id);

    try {
      if (!esIsEmpty(task)) {
        resp.status(200).send(respFormat(task, "task found by ID", true));
      } else {
        resp.status(200).send(respFormat(task, "task not found", false));
      }
    } catch (error) {
      resp.status(202).send(respFormat(null, "tasks not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const task = await taskServices.addOne(req.body);
      resp.status(200);
      if (!esIsEmpty(task)) {
        resp.send(respFormat(task, "task added  successfully", true));
      } else {
        resp.send(respFormat(task, "task Add  failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "tasks Add failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const task = await taskServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(task)) {
        resp.send(respFormat(task, "task Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "tasks Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await taskServices.deleteOne({
        id: req?.params.id,
        user: req?.user?.userEmail,
      });
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "task Delete/Remove successfully", true)
        );
      }
    } catch (error) {
      console.log("task Delete Error ", error);
      resp.send(respFormat(null, "task  Delete/Remove failed", false));
    }
  };
}

const taskController = new TaskController();

module.exports = taskController;
