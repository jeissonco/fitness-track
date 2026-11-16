import { brandIcon } from "@/lib/brand-icon";

// PWA manifest icon (static, generated at build time)
export function GET() {
  return brandIcon(192);
}
