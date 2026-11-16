import type { Metadata } from "next";
import { TrainView } from "@/components/views/train";

export const metadata: Metadata = { title: "Train" };

export default function TrainPage() {
  return <TrainView />;
}
