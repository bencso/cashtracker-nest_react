import api from "@/interceptor/api";

export async function getItems() {
  const items = await api.get("/pantry", { withCredentials: true });
  return items.data.products ? items.data.products : [];
}

export async function addItem({
  code,
  product_name,
  amount,
  expiredAt,
}: {
  code: string;
  product_name: string;
  amount: number;
  expiredAt: Date;
}) {
  try {
    if (!code || !product_name || !amount || !expiredAt) throw new Error();
    
    await api.post(
      "/pantry",
      {
        code: code,
        product_name: product_name,
        amount: amount,
        expiredAt: expiredAt,
      },
      { withCredentials: true }
    );

    return true;
  } catch {
    return null;
  }
}
