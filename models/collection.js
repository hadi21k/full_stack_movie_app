import { Schema, model, models } from "mongoose";

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  backdrop_image: { type: String, required: true },
  medias: [
    {
      title: String,
      src: String,
      mediaId: Number,
      mediaType: String,
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Collection = models.Collection || model("Collection", CollectionSchema);

export default Collection;
