import { connect } from "@/dbconfig/dbconfig";
import { Movie } from "@/models/MoviesSchema";
import { NextResponse, NextRequest } from "next/server";

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
    const { title } = reqBody;

    if (!title) {
      return NextResponse.json(
        { message: "Title field is required in the request body" },
        { status: 400 }
      );
    }

    const movie = await Movie.findOne({ Title: title });
    if (!movie) {
      return NextResponse.json(
        { message: "not found any movie" },
        { status: 404 }
      );
    }
    console.log("successfully search movie");
    return NextResponse.json(
      { movie: movie, message: "find this movie" },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Error in MongoDB operation search route");
    return NextResponse.json(
      { message: "Internal server error", error: e.message },
      { status: 500 }
    );
  }
}
