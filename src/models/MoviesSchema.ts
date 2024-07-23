import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: Number, required: true },
  Rated: { type: String, required: true },
  Released: { type: String, required: true },
  Runtime: { type: String, required: true },
  Genre: { type: String, required: true },
  Director: { type: String, required: true },
  Writer: [{ type: String }],
  Actors: [{ type: String }],
  Plot: { type: String, required: true },
  Language: { type: String, required: true },
  Country: { type: String, required: true },
  Awards: { type: String, required: true },
  Poster: { type: String, required: true },
  imdbRating: { type: Number },
  imdbVotes: { type: String },
  imdbID: { type: String, required: true },
  type: { type: String, default: "unknown" },
  response: { type: Boolean, default: false },
});

export const Movie = mongoose.model("Movie", movieSchema);
