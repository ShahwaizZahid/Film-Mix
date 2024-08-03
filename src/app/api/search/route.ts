import { connect } from "@/dbconfig/dbconfig";
import { Movie } from "@/models/MoviesSchema";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

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
    console.log("Request body", reqBody);
    const { id } = reqBody;
    console.log("Received ID:", id);

    if (!id) {
      return NextResponse.json(
        { message: "ID field is required in the request body" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const movieId = new mongoose.Types.ObjectId(id);
    const movie = await Movie.findOne({ _id: movieId });
    console.log("Found movie:", movie);

    if (!movie) {
      return NextResponse.json({ message: "No movie found" }, { status: 404 });
    }

    const relatedMovies = await Movie.find({ Genre: movie.Genre });
    console.log("Found related movies:", relatedMovies.length);

    return NextResponse.json(
      {
        movie: movie,
        relatedMovies: relatedMovies,
        message: "Movie and related movies found",
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Error in MongoDB operation", e);
    return NextResponse.json(
      { message: "Internal server error", error: e.message },
      { status: 500 }
    );
  }
}
