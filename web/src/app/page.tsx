import { redirect } from "next/navigation";
import { DEFAULT_CARD_ID } from "@/lib/cards";

export default function RootPage() {
  redirect(`/card?card=${DEFAULT_CARD_ID}`);
}
