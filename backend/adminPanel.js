// adminPanel.js

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose"; // ✅ FIX for ESM (type: "module")
import session from "express-session";
import mongoose from "mongoose";

// Models
import User from "./models/User.js";
import Course from "./models/Course.js";
import Note from "./models/Note.js";
import Quiz from "./models/Quiz.js";
import Book from "./models/Book.js";
import Order from "./models/Order.js";

// Register Mongoose Adapter
AdminJS.registerAdapter(AdminJSMongoose);

// AdminJS Instance
const adminJs = new AdminJS({
  rootPath: "/admin",
  databases: [],
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: { isVisible: false }, // Hide password field in UI
        },
      },
    },
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

// Default hardcoded Admin Credentials from .env
const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

// Authenticated AdminJS Router
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

// Mount Admin Panel on Express App
export const mountAdminPanel = (app) => {
  app.use(adminJs.options.rootPath, router);
};
