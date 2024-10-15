"use client";

import { RegisterProductView } from "./page.view";
import { RegisterProductService } from "./page.service";

interface RegisterProductPageProps {
  params: {
    clientId: string;
    companyId: string;
    productId: string;
  };
}

export default function RegisterProduct({ params }: RegisterProductPageProps) {
  const props = RegisterProductService({ params });

  return <RegisterProductView {...props} />;
}
