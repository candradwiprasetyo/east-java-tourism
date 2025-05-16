import EventDetailClient from "./EventDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <EventDetailClient eventId={id} />;
}
