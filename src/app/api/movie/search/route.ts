import { connect } from "@/dbconfig/dbconfig";
import { Movie } from "@/models/MoviesSchema";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connect();
  } catch (e: any) {
    console.error("Error in MongoDB connection", e);
    return NextResponse.json(
      { message: "Database connection error", error: e.message },
      { status: 500 }
    );
  }
  console.log("rea");
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { title } = reqBody;
    if (!title) {
      return NextResponse.json(
        { message: "Title query parameter is required" },
        { status: 400 }
      );
    }

    const movie = await Movie.findOne({ Title: title });

    if (!movie) {
      return NextResponse.json({ message: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (e) {
    console.log("Error in MongoDB operation", e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
