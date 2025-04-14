// lib/db.ts

import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose.connect(
    "mongodb+srv://yogeshb0697:LFlE8uRSk4XNWg7S@fincapluse.q3a2l.mongodb.net/financeDB"
  );
};

export default connectToDatabase;
