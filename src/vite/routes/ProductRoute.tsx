import { useParams } from "react-router-dom";
import { getProduct } from "@/lib/data";
import NotFoundPage from "@/app/not-found";
import { ProductPageContent } from "@/components/product-page-content";

export default function ProductRoute() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);

  if (!product) return <NotFoundPage />;
  return <ProductPageContent slug={slug} />;
}
