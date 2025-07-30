'use client';

import { PageLayout } from "@/components/PageLayout";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function ProductListPage () {
  return (
    <PageLayout>
      <PayPalButtons/>
    </PageLayout>
  )
} 
