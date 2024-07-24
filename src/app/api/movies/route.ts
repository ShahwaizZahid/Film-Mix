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
    const movies = await Movie.find().lean(); // Use .lean() to return plain JavaScript objects
    console.log("Movies fetched successfully:");

    return NextResponse.json({
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (e: any) {
    console.error("Error fetching movies", e);
    return NextResponse.json(
      { message: "Error fetching movies", error: e.message },
      { status: 500 }
    );
  }
}
