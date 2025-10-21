import { NextResponse } from 'next/server';
import prisma from '../../../lib/db'; // 根据需要调整路径

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, email } = await request.json();
  const user = await prisma.user.create({
    data: { name, email },
  });
  return NextResponse.json(user);
}