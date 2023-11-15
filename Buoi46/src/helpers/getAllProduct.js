import { client } from "../config/client";
const getAllProduct = async (query = {}) => {
  const queryString = new URLSearchParams(query).toString();
  const { data, response } = await client.get(`/products?${queryString}`);
  if (response.ok) {
    return data.data;
  } else {
    return "Đã có lỗi xảy ra. Vui lòng thử lại!";
  }
};

export default getAllProduct;
