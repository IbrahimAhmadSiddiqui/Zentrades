"use client";
import { Card, CardContainer, CardFooter, CardHeader } from "@/components/Card";
import useData from "@/hooks/useData";
import { sortProducts } from "@/utils/modify-data";

export default function Task1() {
  const { loading, data, error } = useData();

  if (loading || data === null)
    return <div className="text-white">loading...</div>;

  const sortedProducts = sortProducts(data.products);
  const sortedProductKeys = Object.keys(sortedProducts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container py-4">
        {sortedProductKeys.map((item, index) => {
          const product = sortedProducts[item];
          return (
            <Card key={index}>
              <CardHeader className="mb-2">
                <div className="text-sm font-medium text-neutral-200/60">
                  {product.title}
                </div>
                <div className="text-[8px] uppercase text-neutral-200/40">
                  {product.subcategory}
                </div>
              </CardHeader>
              <CardContainer className="text-3xl font-medium text-emerald-500 ">
                ₹{product.price}
              </CardContainer>
              <CardFooter className="text-neutral-300/50 text-yellow-500 text-xs mt-2">
                {product.popularity}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
