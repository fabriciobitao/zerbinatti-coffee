export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyMetafield {
  key: string;
  value: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  tags: string[];
  metafields: (ShopifyMetafield | null)[];
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: ShopifyPrice;
        availableForSale: boolean;
      };
    }>;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          priceV2: ShopifyPrice;
        };
      };
    }>;
  };
  cost: {
    totalAmount: ShopifyPrice;
  };
}
