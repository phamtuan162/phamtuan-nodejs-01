import { getPackage } from "@/utils/getPackage";
import { IMGLINK } from "@/config/config";
import "./detail.scss";
export const metadata = {
  title: "PackageDetail",
  description: "PackageDetail",
};
import Link from "next/link";
export default async function PackageDetail({ params }) {
  const { id } = params;
  const packageDetail = await getPackage(id);
  const { home, galleryBox } = packageDetail;
  return (
    <section
      className="detail"
      style={{
        backgroundImage: `url(${IMGLINK}/${galleryBox[0].src})`,
      }}
    >
      <div className="content">
        <span>{home.name}</span>
        <h3>Kinh đô thời trang</h3>
        <p>{home.textcontent}</p>
        <a className="btn">Tìm hiểu thêm</a>
      </div>
      <section className="book-form">
        <form action="">
          <div className="inputBox ">
            <span>
              <h1 className="packages">Ưu đãi 30.000.000 cho 5người/3ngày</h1>
            </span>
          </div>

          <div className="inputBox">
            <span>
              <Link className="btn btn-book" href={"./payment"}>
                Đặt ngay
              </Link>
            </span>
          </div>
        </form>
      </section>
    </section>
  );
}
