import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGO_URL!);

mongoose.Promise = global.Promise;

const addProjectSchema = new Schema(
  {
    projectTitle: String,
    projectOwnedBy: String,
    githubUrl: String,
    liveUrl: String,
    description: String,
    logoUrl: String,
    tags: [String],
    projectOwner: {
      type: Schema.Types.Mixed, // This allows `projectOwner` to be any kind of object
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const AddProjectSchema =
  mongoose.models.AddProjectSchema ||
  mongoose.model("AddProjectSchema", addProjectSchema);

export default AddProjectSchema;
