import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import { createUser, getUser, getUsers } from "./functions/firestore";
import { userParam, userSchema } from "./validators/firestore-schema";
import { validateRequest } from "./validators/validator-middleware";

admin.initializeApp();

const app = express();

app.post("/user", userSchema, validateRequest, createUser);

app.get("/users", getUsers);
app.get("/user/:id", userParam, validateRequest, getUser);

exports.rest = functions.https.onRequest(app);