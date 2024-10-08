import { NextRequest, NextResponse } from "next/server";
import AddProjectSchema from "@/app/models/AddProjectSchema";
import { connectToDatabase } from "@/lib";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const projectData = body.formData;

    await AddProjectSchema.create(projectData);

    return NextResponse.json({ message: "Project Added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error Occured", error },
      { status: 500 }
    );
  }
}

// export async function GET() {}
