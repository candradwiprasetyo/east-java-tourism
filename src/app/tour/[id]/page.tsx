import TourDetailClient from "./TourDetailClient";

interface Props {
  params: {
    id: string;
  };
}

export default function TourDetailPage({ params }: Props) {
  return <TourDetailClient tourId={params.id} />;
}
