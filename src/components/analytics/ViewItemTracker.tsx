"use client";

import { useEffect } from "react";
import { pushEcommerce } from "@/lib/analytics/dataLayer";

type Props = {
  itemId: string;
  itemName: string;
  price: number;
  itemBrand?: string;
  itemCategory?: string;
};

export function ViewItemTracker({
  itemId,
  itemName,
  price,
  itemBrand = "Zerbinatti",
  itemCategory = "Café especial",
}: Props) {
  useEffect(() => {
    pushEcommerce("view_item", {
      currency: "BRL",
      value: price,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_brand: itemBrand,
          item_category: itemCategory,
          price,
          quantity: 1,
        },
      ],
    });
  }, [itemId, itemName, price, itemBrand, itemCategory]);

  return null;
}
