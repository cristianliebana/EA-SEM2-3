import { Schema, model, connect, Document } from "mongoose";

// 1. Create an interface representing a document in MongoDB.

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
}

interface IMovie {
  name: string;
  actor: IUser;
  category: string;
}

// 2. Create Schemas corresponding to the document interfaces.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

const movieSchema = new Schema<IMovie>({
  name: { type: String, required: true },
  actor: { type: Schema.Types.ObjectId, ref: "User" },
  category: String,
});

// 3. Create Models.
const User = model<IUser>("User", userSchema);
const Movie = model<IMovie>("Movie", movieSchema);

run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect("mongodb://127.0.0.1:27017/test");

  // Crear un usuario
  const user = new User({
    name: "Nicolas Cage",
    email: "nicky@gmailcom",
    avatar: "https://i.imgur.com/dM7Thhn.png",
  });
  await user.save();

  // Crear una película asociada al usuario
  const movie = new Movie({
    name: "La Busqueda",
    actor: "650eb93e60e69c1c100f0821",
    category: "Aventura",
  });
  await movie.save();

  const populateMovie = await Movie.findById(movie._id).populate("actor");
  console.log(populateMovie);
  console.log(
    "La Pelicula",
    populateMovie.name,
    "tiene de actor a",
    populateMovie.actor.name
  );
}
