import { NextRequest, NextResponse } from 'next/server';
import { getCard } from '@/lib/cards';

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/cards/[id]'>) {
  const { id } = await ctx.params;
  const card = getCard(id);
  if (!card) {
    return NextResponse.json({ error: `No card with id "${id}"` }, { status: 404 });
  }
  return NextResponse.json(card);
}
