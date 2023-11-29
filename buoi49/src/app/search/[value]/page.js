import { getPackage } from "@/utils/searchPackage";
import React from "react";
import Packages from "@/components/Packages/Packages";
const ResultSearch = async ({ params }) => {
  const { value } = params;
  const pages = await getPackage({ q: value });
  const title = "KẾT QUẢ TÌM KIẾM";
  return (
    <>
      <h1 className="heading">
        {title.split("").map((phrase, phraseIndex) => (
          <React.Fragment key={phraseIndex}>
            <span className={phrase === " " ? "space" : ""}>{phrase}</span>
          </React.Fragment>
        ))}
      </h1>

      {pages.length ? (
        <Packages pages={pages} />
      ) : (
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "10rem",
          }}
        >
          Không tìm thấy kết quả
        </h1>
      )}
    </>
  );
};
export default ResultSearch;
