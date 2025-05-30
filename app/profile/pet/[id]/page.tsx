import PetDetailClient from "./PetDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PetDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PetDetailClient id={id} />;
}
