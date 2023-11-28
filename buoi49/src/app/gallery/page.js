import { getData } from "@/utils/getData";
export const metadata = {
  title: "Gallery",
  description: "Gallery Shop",
};
import Link from "next/link";
import React from "react";
import { IMGLINK } from "@/config/config";
import "./gallery.scss";
export default async function Gallery() {
  const pages = await getData();
  return (
    <>
      {pages.map(({ id: pageId, galleryBox, home }) => {
        return (
          <section
            className="gallery"
            key={pageId}
            id={home.name.toLowerCase()}
          >
            <h1 className="heading">
              {home.name.split("").map((phrase, phraseIndex) => (
                <React.Fragment key={phraseIndex}>
                  <span>{phrase}</span>
                </React.Fragment>
              ))}
            </h1>
            <div className="container">
              {galleryBox.map(({ src, id }) => {
                return (
                  <div className="box" key={id}>
                    <img src={`${IMGLINK}${src}`} alt="" />
                    <div className="content">
                      <h3>Tổng hợp</h3>
                      <p>Tổng hợp những bức ảnh</p>
                      <p>đẹp nhất của {home.name}</p>
                      <Link href={`/packages/${pageId}`} className="btn">
                        Đặt ngay
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
