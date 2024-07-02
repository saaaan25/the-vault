import { NextResponse } from 'next/server'
import getSongs from '@/actions/getSongs'

export async function GET() {
  const songs = await getSongs()
  return NextResponse.json(songs)
}