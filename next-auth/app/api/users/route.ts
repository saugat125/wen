import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib', 'users.json');

function readUsers() {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function writeUsers(users: any) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const newUser = await req.json();
  const users = readUsers();
  users.push(newUser);
  writeUsers(users);
  return NextResponse.json({ success: true, user: newUser });
}

export async function DELETE(req: Request) {
  const { email } = await req.json();
  let users = readUsers();
  users = users.filter((u: any) => u.email !== email);
  writeUsers(users);
  return NextResponse.json({ success: true });
}
