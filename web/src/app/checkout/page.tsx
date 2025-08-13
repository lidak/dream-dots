'use client';

import { PageLayout } from "@/components/PageLayout";
import { Title } from "@/components/Title";
import { PayPalButtons } from "@paypal/react-paypal-js";
import type { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { useCartStore, useGetCartProducts, useGetCartTotal } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function ProductListPage () {
  const products = useGetCartProducts();
  const total = useGetCartTotal();
  const { clearCart } = useCartStore();
  const router = useRouter();
  
  const createOrder = (data: CreateOrderData, actions: CreateOrderActions) => {
    // Here you would typically call your backend to create the order
    // For this example, we'll create a simple order directly
    console.log("Creating order for", total);
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              }
            }
          },
          items: products.map(product => ({
            name: product.name,
            quantity: product.count.toString(),
            unit_amount: {
              currency_code: "USD",
              value: product.price.toFixed(2),
            },
            category: 'PHYSICAL_GOODS',
          })),
        },
      ],
      application_context: {
        // This will ask the user for a shipping address on the PayPal site.
        shipping_preference: 'GET_FROM_FILE',
      }
    });
  };

  const onApprove = (data: OnApproveData, actions: OnApproveActions) => {
    // Call your backend to capture the order.
    // This is more secure and allows you to save the order details to your database.
    return fetch(`/api/orders/${data.orderID}/capture`, {
      method: "POST",
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to capture order');
      }
      return res.json();
    })
    .then((orderData) => {
      // Your backend returns the captured order details, including shipping info.
      const name = orderData.payer?.name?.given_name || 'Customer';
      const shipping = orderData.purchase_units[0]?.shipping;
      const address = shipping?.address;

      console.log(`Transaction completed by ${name}. Shipping to:`, address);

      clearCart();
      router.push('/checkout/success');
    }).catch(error => {
      console.error("Error capturing order:", error);
      router.push('/checkout/error');
    });
  };

  const onError = (err: any) => {
    console.error("An error occurred with the PayPal button:", err);
    router.push('/checkout/error');
  }

  return (
    <PageLayout>
      <div className="p-8 flex flex-col items-center">
        <Title size={1}>Checkout</Title>
        <div className="w-full max-w-md mt-8">
          <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />
        </div>
      </div>
    </PageLayout>
  )
} 
