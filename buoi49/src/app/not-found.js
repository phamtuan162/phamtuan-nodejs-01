import Link from "next/link";
import Image from "next/image";
import errorImage from "@/assets/images/404.png";
const NotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        position: "fixed",
        inset: "0",
        zIndex: "9999",
        background: "#fff",
      }}
    >
      <h1 style={{ color: "#000" }}>Page Not Found</h1>
      <Image
        src={errorImage}
        alt="Page Not Found"
        style={{ width: "600px", height: "400px", margin: "0 auto" }}
      />
      <p style={{ color: "#000" }}>
        Lạc đường rồi. Vui lòng quay lại trang chủ
      </p>
      <Link style={{ color: "#000" }} href={"/"}>
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
