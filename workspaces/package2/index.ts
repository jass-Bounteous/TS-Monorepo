import express, { Application, Request, Response } from "express";
import userTemplateCopy from "../package2/schema/userSchema";

import DbConnect from "@ts-monorepo/package1";
import { validUserType } from "../package2/types";
import bcrypt from "bcrypt";
// const app =express();
const app: Application = express();
app.use(express.json());
// app.use(methodLogger);

DbConnect();

const isInValid = (data: validUserType): boolean => {
  console.log(data);
  return !(
    data.name &&
    data.mobile_no &&
    data.email &&
    data.password &&
    data.emp_code
  );
};

const emptyDB = async () => {
  console.log("called");
  await userTemplateCopy
    .deleteMany()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const populateDB = async () => {
  const dummyData = {
    name: "tester",
    emp_code: 3053,
    password: "pass",
    email: "tester@gmail.com",
    mobile_no: 9876543210,
    dob: "01-07-2001",
  };
  await userTemplateCopy.create(dummyData);
};

const addUserService = async (user: validUserType) => {
  const resData = await userTemplateCopy.create(user);
  return resData;
};

app.get("/app/user", async (req: Request, res: Response) => {
  userTemplateCopy
    .find()
    .then((data) => {
      if (data.length > 0) res.status(200).send(data);
      else res.status(204).json({ msg: "No user data available" });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Err: " + err });
    });
});

app.post("/app/user", async (req: Request, res: Response) => {
  const userData: validUserType = req.body;
  if (isInValid(userData)) {
    res.status(400).json({ msg: "Bad request" });
    return;
  }
  try {
    // Check Duplication of Employee Code
    const dbUser = await userTemplateCopy.findOne({ name: userData.name });
    if (dbUser)
      return res.status(401).json({
        msg: "This Username has already been registered",
      });
    const saltPassword = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, saltPassword);

    console.log(userData);
    const resData = await addUserService(userData);
    console.log(resData);
    res.status(201).json({ msg: "User added successfully", data: resData });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

app.listen(5000, () => console.log("Server started"));
// import fun from "@ts-monorepo/package1";

// fun();
// console.log("Run aavudhaa??");

export default app;
export { emptyDB, populateDB };
