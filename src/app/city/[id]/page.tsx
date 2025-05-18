import CityDetailClient from "./CityDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CityDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <CityDetailClient cityId={id} />;
}
