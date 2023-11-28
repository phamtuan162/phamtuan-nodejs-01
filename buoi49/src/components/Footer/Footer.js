"use client";
import "./footer.scss";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="box">
          <a href="#" className="logo">
            <h3>
              <span>S</span>travel
            </h3>
          </a>
          <p>
            Trải qua 17 năm phát triển bền vững, STravel đã ghi dấu ấn của mình
            với thông điệp <br />
            “Nâng tầm trải nghiệm từng chuyến đi”
          </p>
        </div>
        <div className="box">
          <h3>Chi nhánh chính</h3>
          <a href="#">Hà nội</a>
          <a href="#">Ấn độ</a>
          <a href="#">Mỹ</a>
          <a href="#">Nhật Bản</a>
          <a href="#">Pháp</a>
        </div>
        <div className="box">
          <h3>chuyển hướng</h3>
          <a href="#home">Trang Chủ</a>
          <a href="#book">Đặt lịch</a>
          <a href="#packages">Ưu Đãi</a>
          <a href="#services">Dịch Vụ</a>
          <a href="#gallery">Thư Viện</a>
          <a href="#review">Đánh giá</a>
          <a href="#contact">Liên Hệ</a>
        </div>
        <div className="box">
          <h3>Tương tác</h3>
          <a href="#">facebook</a>
          <a href="#">instagram</a>
          <a href="#">twitter</a>
          <a href="#">linkedin</a>
        </div>
        <h1 className="credit">
          created by <span> STRAVEL </span> | all rights reserved!
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
