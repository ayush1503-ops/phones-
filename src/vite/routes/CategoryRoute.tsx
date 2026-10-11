import { useParams } from "react-router-dom";
import { CATEGORIES } from "@/lib/data";
import NotFoundPage from "@/app/not-found";
import { CategoryPageContent } from "@/components/category-page-content";

export default function CategoryRoute() {
  const { slug = "" } = useParams();
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) return <NotFoundPage />;
  return <CategoryPageContent slug={slug} />;
}
