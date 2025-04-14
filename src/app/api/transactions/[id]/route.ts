import connectToDatabase from "@/lib/db";
import { Transaction } from "@/lib/models/Transaction";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const data = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedTransaction) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  try {
    // Await the dynamic route parameters

    // Connect to the database
    await connectToDatabase();
    const { id } = await context.params;

    // Find the transaction by ID and delete it
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    // If the transaction doesn't exist, return an error
    if (!deletedTransaction) {
      return NextResponse.json(
        { success: false, message: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
