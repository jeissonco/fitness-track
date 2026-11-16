import type { Metadata } from "next";
import { CardioView } from "@/components/views/cardio";

export const metadata: Metadata = { title: "Cardio" };

export default function CardioPage() {
  return <CardioView />;
}
