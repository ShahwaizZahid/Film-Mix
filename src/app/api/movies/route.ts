import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/models/MoviesSchema";

export async function GET(request: NextRequest) {
  try {
    await connect();
    console.log("MongoDB connected successfully");
  } catch (e) {
    console.log("Error in MongoDB connection", e);
    return NextResponse.json(
      { message: "Database connection error" },
      { status: 500 }
    );
  }

  try {
    const movies = await Movie.find();
    console.log("Movies fetched successfully:");
    return NextResponse.json({
      message: "Movies fetched successfully",
      movies: movies,
    });
  } catch (e) {
    console.log("Error fetching movies", e);
    return NextResponse.json(
      { message: "Error fetching movies" },
      { status: 500 }
    );
  }
}
