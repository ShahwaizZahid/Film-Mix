import { connect } from "@/dbconfig/dbconfig";
import { Movie } from "@/models/MoviesSchema";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await connect();
  } catch (e: any) {
    console.error("Error in MongoDB connection", e);
    return NextResponse.json(
      { message: "Database connection error", error: e.message },
      { status: 500 }
    );
  }

  try {
    const reqBody = await request.json();
    const { id } = reqBody;

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

    if (!movie) {
      return NextResponse.json({ message: "No movie found" }, { status: 404 });
    }

    const relatedMovies = await Movie.find({ Genre: movie.Genre });
    console.log("successfully search by id movie and related movies");
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
