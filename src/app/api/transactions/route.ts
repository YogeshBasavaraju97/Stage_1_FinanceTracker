import connectToDatabase from "@/lib/db";
import { Transaction } from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Retrieve all transactions, sorted by date in descending order
    const transactions = await Transaction.find().sort({ date: -1 });

    // Return the list of transactions as a JSON response
    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);

    // Return a server error response
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Parse the incoming request data
    const { description, amount, date } = await req.json();

    // Check if the required fields are present
    if (!description || !amount || !date) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new transaction in the database
    const transactions = await Transaction.create({
      description,
      amount,
      date,
    });

    // Return the newly created transaction
    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error("Error creating transaction:", error);

    // Return a server error response
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
