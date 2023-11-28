import "./packages.scss";
import { IMGLINK } from "../../config/config";
import Link from "next/link";
async function Packages({ pages }) {
  return (
    <div id="packages">
      <h1 className="heading">
        <span>Ư</span>
        <span>U</span>
        <span className="space"></span>
        <span>Đ</span>
        <span>Ã</span>
        <span>I</span>
      </h1>
      <div className="container">
        {pages.map(({ id, home, galleryBox }) => {
          return (
            <div key={id} className="box">
              <img src={`${IMGLINK}${galleryBox[0].src}`} alt="img" />
              <div className="content">
                <h3>
                  <i className="fas fa-map-marker-alt"></i> {home.name}
                </h3>
                <p>
                  {home.name}-{home.content}
                </p>
                <p>chuyến đi dành cho gia đình 3N/2Đ</p>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
                <div className="price">
                  30.000.000 <span>52.845.245</span>
                </div>
                <Link href={`/packages/${id}`} className="btn">
                  Đặt ngay
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Packages;
