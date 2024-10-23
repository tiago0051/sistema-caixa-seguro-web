"use client";

import { RegisterProductView } from "./page.view";
import { RegisterProductService } from "./page.service";

export default function RegisterProduct() {
  const props = RegisterProductService();

  return <RegisterProductView {...props} />;
}
