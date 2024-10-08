import mongoose, { Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://khushaalchoithramani:3dCpzg8zZaFt6QDm@stipemecluster.shnu1dc.mongodb.net/opensource-saas-db"
);

mongoose.Promise = global.Promise;

const userprojectSchema = new Schema(
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

const ProjectSchemaModel =
  mongoose.models.ProjectSchemaModelNew ||
  mongoose.model("ProjectSchemaModelNew", userprojectSchema);

export default ProjectSchemaModel;
