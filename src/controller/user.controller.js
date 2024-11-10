const { esIsEmpty } = require("../../utils/esHelper");
const respFormat = require("../../utils/response/respFormat");
const userServices = require("../services/user.services");

class UserController {
  getAll = async (req, resp) => {
    try {
      const users = await userServices.getAll();
      resp.status(200);

      if (!esIsEmpty(users)) {
        resp.send(respFormat(users, `${users?.length} users found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` users not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` users not found`, true));
    }
  };

  getAllByRole = async (req, resp) => {
    try {
      const users = await userServices.getAllByRole(req.params?.role);
      resp.status(200);

      if (!esIsEmpty(users)) {
        resp.send(respFormat(users, `${users?.length} users found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` users not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` users not found`, true));
    }
  };

  getAllByQuery = async (req, resp) => {
    try {
      const users = await userServices.getAllByQuery(req.query);
      resp.status(200);

      if (!esIsEmpty(users)) {
        resp.send(respFormat(users, `${users?.length} users found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` users not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` users not found`, true));
    }
  };

  getOne = async (req, resp) => {
    const user = await userServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(user)) {
        resp.send(respFormat(user, "user not found", true));
      }
    } catch (error) {
      console.log("Get users, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "users not found", false));
    }
  };

  getUserAllPayment = async (req, resp) => {
    const paids = await userServices.getOneAllPaids(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(paids)) {
        resp.send(respFormat(paids, `${paids.length} User Pyament's found`, true));
      }
    } catch (error) {
      console.log("Get User Pyament's, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "User Pyament's not found", false));
    }
  };
  add = async (req, resp) => {
    try {
      const user = await userServices.addOne(req.body);
      resp.status(200);

      if (!esIsEmpty(user)) {
        resp.send(respFormat(user, "user Added  successfully", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "users Update failed", false));
    }
  };

  updateOne = async (req, resp) => {
    try {
      const user = await userServices.userUpdate(req.body);
      resp.status(200);

      if (!esIsEmpty(user)) {
        resp.send(respFormat(user, "User Updated successfully", true));
      } else {
        resp.send(respFormat(user, "User Updated Failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "User Update failed", false));
    }
  };

  updateOnly = async (req, resp) => {
    try {
      const user = await userServices.updateOnly(req.body);
      resp.status(200);

      if (!esIsEmpty(user)) {
        resp.send(respFormat(user, "User Updated successfully", true));
      } else {
        resp.send(respFormat(user, "User Updated Failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "User Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await userServices.deleteOne(req?.params?.id);
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "user Delete/Remove  successfully", true)
        );
      } else {
        resp.send(respFormat(null, "user  Delete/Remove failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "user  Delete/Remove failed", false));
    }
  };
}

const userController = new UserController();

module.exports = userController;
