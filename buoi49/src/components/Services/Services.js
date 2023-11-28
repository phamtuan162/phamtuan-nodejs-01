import "./services.scss";
function Services() {
  return (
    <div id="services">
      <h1 className="heading">
        <span>D</span>
        <span>Ị</span>
        <span>C</span>
        <span>H</span>
        <span className="space"></span>
        <span>V</span>
        <span>Ụ</span>
      </h1>
      <div className="container">
        <div className="box">
          <i className="fas fa-hotel"></i>
          <h3>nghỉ dưỡng cao cấp</h3>
          <p>Some text...</p>
        </div>
        <div className="box">
          <i className="fas fa-utensils"></i>
          <h3>Dịch vụ ăn uống</h3>
          <p>Some text...</p>
        </div>
        <div className="box">
          <i className="fas fa-bullhorn"></i>
          <h3>chính sách an toàn</h3>
          <p>Some text...</p>
        </div>
        <div className="box">
          <i className="fas fa-globe-asia"></i>
          <h3>rộng khắp thế giới</h3>
          <p>Some text...</p>
        </div>
        <div className="box">
          <i className="fas fa-plane"></i>
          <h3>tốc độ cao</h3>
          <p>Some text...</p>
        </div>
        <div className="box">
          <i className="fas fa-hiking"></i>
          <h3>Những cuộc phiêu lưu</h3>
          <p>Some text...</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
