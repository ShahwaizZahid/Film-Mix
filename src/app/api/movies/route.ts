import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/models/MoviesSchema";

export async function GET(request: NextRequest) {
  console.log("Request received", process.env.MONGO_URL);

  try {
    await connect();
    console.log("MongoDB connected successfully");
  } catch (e: any) {
    console.error("Error in MongoDB connection", e);
    return NextResponse.json(
      { message: "Database connection error", error: e.message },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1) {
      throw new Error("Invalid page number. Page must be a positive integer.");
    }
    if (isNaN(limit) || limit < 1) {
      throw new Error("Invalid limit. Limit must be a positive integer.");
    }

    const skip = (page - 1) * limit;

    const movies = await Movie.find().skip(skip).limit(limit).lean();
    console.log("Movies fetched successfully:", movies);

    return NextResponse.json({
      message: "Movies fetched successfully",
      data: movies,
      page,
      limit,
    });
  } catch (e: any) {
    console.error("Error fetching movies", e);

    const status = e.message.includes("Invalid") ? 400 : 500;
    return NextResponse.json(
      { message: "Error fetching movies", error: e.message },
      { status }
    );
  }
}
