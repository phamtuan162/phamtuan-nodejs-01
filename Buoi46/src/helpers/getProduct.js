import { client } from "../config/client";
const getProduct = async (productId) => {
  const { data, response } = await client.get(`/products/`, productId);
  if (response.ok) {
    console.log(data);
    return data;
  } else {
    return "Đã có lỗi xảy ra. Vui lòng thử lại!";
  }
};
export default getProduct;
