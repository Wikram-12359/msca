import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if(!name || !email || !password){ 
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    await User.create({ name, email, password })

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  }
  catch(error){
    console.error("Error occurred while registering user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

}


// const session = await getServerSession(authOptions)
// if(!session){
//   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
// }
// if(session.user.id !== userId){
//   return NextResponse.json({ error: "Forbidden" }, { status: 403 })
// }
// if(session.user.id === userId && session.user.role !== "admin"){
//   return NextResponse.json({ error: "Forbidden" }, { status: 403 })
// }