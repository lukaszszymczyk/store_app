import React from "react";
import { HomeTemplate } from "components/templates/HomeTemplate/HomeTemplate";
import { Spinner } from "components/atoms/Spinner/Spinner";
import { Message } from "components/atoms/Message/Message";
import { useFetchProducts } from "services/features/products/useFetchProducts";
import { PageWrapper } from "pages/PageWrapper/PageWrapper";

export function Home(): JSX.Element {
  const { products, isLoading, errorMessage } = useFetchProducts();

  return (
    <>
      <PageWrapper
        title="Store App"
        description="Store App gives you possibility to purchase high-quality products"
      >
        {!products && errorMessage && (
          <Message type="error" text={errorMessage} />
        )}
        {!products && !errorMessage && <Spinner isLoading={isLoading} />}
        {products && <HomeTemplate allProducts={products} />}
      </PageWrapper>
    </>
  );
}
