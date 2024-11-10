const { esIsEmpty } = require("../../utils/esHelper");
const respFormat = require("../../utils/response/respFormat");
const paymentServices = require("../services/payment.services");

class PaymentController {
  getAll = async (req, resp) => {
    try {
      const payments = await paymentServices.getAll();
      resp.status(200);

      if (!esIsEmpty(payments)) {
        resp.send(
          respFormat(payments, `${payments?.length} Payments found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, `Payments not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, `Payments not found`, true));
    }
  };

  getAllByQuery = async (req, resp) => {
    try {
      const payments = await paymentServices.getAllByQuery(req.query);
      resp.status(200);

      if (!esIsEmpty(payments)) {
        resp.send(
          respFormat(
            payments,
            `${payments?.length} payments found By Query`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` payments not found By Query`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` payments not found`, true));
    }
  };

  getOne = async (req, resp) => {
    // console.log("payment Get One ...User, ", req.user);

    const payment = await paymentServices.getOne(req?.params?.id);

    try {
      if (!esIsEmpty(payment)) {
        resp.status(200).send(respFormat(payment, "payment found by ID", true));
      } else {
        resp.status(200).send(respFormat(payment, "payment not found", false));
      }
    } catch (error) {
      resp.status(202).send(respFormat(null, "payments not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const payment = await paymentServices.addOne(req.body);
      resp.status(200);
      if (!esIsEmpty(payment)) {
        resp.send(respFormat(payment, "payment added  successfully", true));
      } else {
        resp.send(respFormat(payment, "payment Add  failed", false));
      }
    } catch (error) {
      resp.send(respFormat(null, "payments Add failed", false));
    }
  };

  createIntent = async (req, resp) => {
    try {
      const paymentInt = await paymentServices.createIntent(req.body, req.user);

      resp.status(200);

      if (!esIsEmpty(paymentInt)) {
        resp.send(respFormat(paymentInt, "payment Intent Created :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "Payment Intent create failed", false));
    }
  };

  updateOne = async (req, resp) => {
    try {
      const payment = await paymentServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(payment)) {
        resp.send(respFormat(payment, "payment Updated :)", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "payments Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await paymentServices.deleteOne({
        id: req?.params.id,
        user: req?.user?.userEmail,
      });
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "payment Delete/Remove successfully", true)
        );
      }
    } catch (error) {
      console.log("payment Delete Error ", error);
      resp.send(respFormat(null, "payment  Delete/Remove failed", false));
    }
  };
}

const paymentController = new PaymentController();

module.exports = paymentController;
