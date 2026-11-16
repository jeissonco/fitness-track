import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlanView } from '@/components/views/plan';
import { PLANS } from '@/lib/plan-catalog';
import { planById } from '@/lib/plans';

// Every plan is known at build time, so each page is prerendered.
export function generateStaticParams() {
  return PLANS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<'/plans/[id]'>): Promise<Metadata> {
  const { id } = await params;
  return { title: planById(id)?.name.en ?? 'Plan' };
}

export default async function PlanPage({ params }: PageProps<'/plans/[id]'>) {
  const { id } = await params;
  if (!planById(id)) notFound();
  return <PlanView id={id} />;
}
