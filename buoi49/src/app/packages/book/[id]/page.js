import { getPackage } from "@/utils/getPackage";
import { IMGLINK } from "@/config/config";
import "./book.scss";

import BookForm from "./BookForm";
export default async function Book({ params }) {
  const { id } = params;
  const packageDetail = await getPackage(id);
  const { home, galleryBox } = packageDetail;

  return (
    <section
      className="book"
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
        <BookForm />
      </section>
    </section>
  );
}
