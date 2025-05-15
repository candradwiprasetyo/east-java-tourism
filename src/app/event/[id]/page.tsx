import EventDetailClient from "./EventDetailClient";

interface Props {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: Props) {
  return <EventDetailClient eventId={params.id} />;
}
