export default async function POST(req, res) {
  console.log(req);
  // if (req.method === "POST") {
  //   try {
  //     // Lấy dữ liệu từ request body
  //     const flowData = req.body;

  //     // Thực hiện các xử lý với dữ liệu (ở đây, tôi chỉ log ra console)
  //     console.log("Received flow data:", flowData);

  //     // Trả về kết quả thành công
  //     res
  //       .status(200)
  //       .json({ success: true, message: "Flow data received successfully" });
  //   } catch (error) {
  //     // Trả về lỗi nếu có bất kỳ lỗi nào xảy ra
  //     console.error("Error processing flow data:", error);
  //     res
  //       .status(500)
  //       .json({ success: false, message: "Internal server error" });
  //   }
  // } else {
  //   // Trả về lỗi nếu phương thức không phải là POST
  //   res.status(405).json({ success: false, message: "Method Not Allowed" });
  // }
}
