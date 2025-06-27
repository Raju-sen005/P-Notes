// adminPanel.js
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSMongoose from "@adminjs/mongoose";
import session from "express-session";
import mongoose from "mongoose";
import User from "./models/User.js"; // अपनी User model का path सही रखें
import Course from "./models/Course.js";
import Note from "./models/Note.js";
import Quiz from "./models/Quiz.js";
import Book from "./models/Book.js";
import Order from "./models/Order.js";

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
  databases: [],
  rootPath: "/admin",
  resources: [
    { resource: User, options: { properties: { password: { isVisible: false } } } },
    { resource: Course },
    { resource: Note },
    { resource: Quiz },
    { resource: Book },
    { resource: Order },
  ],
  branding: {
    companyName: "P-Notes Admin",
    logo: false,
    softwareBrothers: false,
  },
});

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return DEFAULT_ADMIN;
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: "complex-cookie-password",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: "complex-secret-value",
  }
);

export const mountAdminPanel = (app) => {
  app.use(adminJs.options.rootPath, router);
};
