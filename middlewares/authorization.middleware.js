const { verifyToken } = require("../helpers/jwt.helper");
const { User } = require("../models");

async function authorizationCustomer(req, res, next) {
  try {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
      throw { status: 401, message: "Authorization failed" };
    }

    const decoded = verifyToken(accessToken);
    if (decoded.ole != "customer") {
      throw { status: 401, message: "Authorization failed" };
    }

    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw { status: 401, message: "Authorization failed" };
    }

    req.loggedIn = user;
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      status: "failed",
      message: error.message,
    });
  }
}

async function authorizationAdmin(req, res, next) {
  try {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
      throw { status: 401, message: "Authorization failed" };
    }

    const decoded = verifyToken(accessToken);
    if (decoded.role != "admin") {
      throw { status: 401, message: "Authorization failed" };
    }

    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      throw { status: 401, message: "Authorization failed" };
    }

    req.loggedIn = user;
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      status: "failed",
      message: error.message,
    });
  }
}

async function authorizationAdminAndCustomer(req, res, next) {
  try {
    const accessToken = req.headers["access-token"];
    if (!accessToken) {
      throw { status: 401, message: "Authorization failed" };
    }

    const decoded = verifyToken(accessToken);

    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user || (decoded.role !== "admin" && decoded.role !== "customer")) {
      throw { status: 401, message: "Authorization failed" };
    }

    req.loggedIn = user;
    next();
  } catch (error) {
    res.status(error.status || 500).json({
      status: "failed",
      message: error.message,
    });
  }
}

module.exports = {
  authorizationAdmin,
  authorizationCustomer,
  authorizationAdminAndCustomer,
};
