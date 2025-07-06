import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import { Movie } from "@/models/MoviesSchema";

export async function GET(request: NextRequest) {
  try {
    await connect();
  } catch (e: any) {
    return NextResponse.json(
      { message: "Database connection error", error: e.message },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 50); // Cap limit at 50

    if (isNaN(page) || page < 1) {
      throw new Error("Invalid page number. Page must be a positive integer.");
    }
    if (isNaN(limit) || limit < 1) {
      throw new Error("Invalid limit. Limit must be a positive integer.");
    }

    const skip = (page - 1) * limit;

    // Get total count for pagination metadata
    const totalCount = await Movie.countDocuments().exec();
    const totalPages = Math.ceil(totalCount / limit);

    // Optimize query with projection to only fetch needed fields
    const movies = await Movie.find(
      {},
      {
        Title: 1,
        Year: 1,
        Rated: 1,
        Genre: 1,
        Director: 1,
        Plot: 1,
        Poster: 1,
        imdbRating: 1,
        Runtime: 1,
        Country: 1,
        _id: 1,
      }
    )
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    // Set cache headers for better performance
    return NextResponse.json(
      {
        message: "Movies fetched successfully",
        data: movies,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          nextPage: page < totalPages ? page + 1 : null,
          prevPage: page > 1 ? page - 1 : null,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 minutes
        },
      }
    );
  } catch (e: any) {
    const status = e.message.includes("Invalid") ? 400 : 500;
    return NextResponse.json(
      { message: "Error fetching movies", error: e.message },
      { status }
    );
  }
}
