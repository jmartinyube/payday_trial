const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export async function shopify(query: string, variables: Record<string, any> = {}) {
  const endpoint = `https://${domain}/api/2024-07/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error("Shopify API Errors:", json.errors);
    throw new Error("Error desde Shopify API");
  }

  return json.data;
}

export async function getProducts() {
  const query = `
    query {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges { node { url } }
            }
            priceRange { minVariantPrice { amount currencyCode } }
          }
        }
      }
    }
  `;
  const data = await shopify(query);
  return data.products.edges.map((edge: any) => edge.node);
}

export async function getProduct(handle: string) {
  if (!handle) throw new Error("Handle no definido");

  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        images(first: 5) { edges { node { url } } }
        variants(first: 1) { edges { node { id } } }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  `;

  const data = await shopify(query, { handle });

  if (!data.product) return null;
  return data.product;
}






