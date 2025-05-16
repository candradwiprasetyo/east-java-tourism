import TourDetailClient from "./TourDetailClient";

interface Props {
  params: {
    id: string;
  };
}

export default async function TourDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <TourDetailClient tourId={id} />;
}
