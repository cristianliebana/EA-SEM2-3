import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

interface IJuego {
  name: string;
  description: string;
  category: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

const juegoSchema = new Schema<IJuego>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// 3. Create a Model.
const User = model<IUser>("User", userSchema);

const Juego = model<IJuego>("Juego", juegoSchema);

run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect("mongodb://127.0.0.1:27017/test");

  //Read de Juego por ID
  const juegoId = "650eb899e9d906a2eea4d660";
  const juego2 = await Juego.findById(juegoId);

  console.log(juego2);

  //Para buscar todos los usuarios
  const allUsers = await User.find();
  console.log(allUsers);

  // Actualizar juego por ID

  const juegoId2 = "650eb86090f298971c4edd1f";
  await Juego.findByIdAndUpdate(juegoId, {
    name: "Zelda Breath of the wild",
    description: "Second Best game in history",
    category: "Adventure",
  });

  //Borrar Juego por ID

  const juegoId3 = "650ec18c7975a8fb73cef218";
  await Juego.findByIdAndRemove(juegoId);

  //Creamos usuario y juego

  const user = new User({
    name: "Jose",
    email: "jose@larrinzal.com",
    avatar: "https://i.imgur.com/dMsadf.png",
  });
  await user.save();

  const juego = new Juego({
    name: "EA FC 24",
    description: "Lo mismo de cada año",
    category: "Furbo",
  });
  await juego.save();

  console.log(user.email);
  console.log(juego.name);
}
