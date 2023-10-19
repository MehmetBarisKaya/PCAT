const mongoose = require("mongoose");
const Schema = mongoose.Schema;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");
}

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model("Photo", PhotoSchema);

Photo.create({
  title: "Photo Title 2",
  description: "Photo description 2lorem ipsum",
});
