import { NextResponse } from "next/server";

async function SayHello() {
  // GET
  return NextResponse.json({ message: "Hello!" });
}

export { SayHello as GET };
