import { connect } from "@/dbconfig/dbconfig";
import { Movie } from "@/models/MoviesSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connect();
    console.log("Connected to MongoDB");
  } catch (e: any) {
    console.error("Error in MongoDB connection", e);
    return NextResponse.json(
      { message: "Database connection error", error: e.message },
      { status: 500 }
    );
  }

  try {
    const reqBody = await request.json();
    console.log("e", reqBody);
    const { title } = reqBody;

    if (!title) {
      return NextResponse.json(
        { message: "Title field is required in the request body" },
        { status: 400 }
      );
    }

    const movie = await Movie.find({ Title: title });
    console.log(movie);
    if (movie.length <= 0) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }
    console.log("aa");
    return NextResponse.json(movie, { status: 200 });
  } catch (e: any) {
    console.error("Error in MongoDB operation", e);
    return NextResponse.json(
      { message: "Internal server error", error: e.message },
      { status: 500 }
    );
  }
}
