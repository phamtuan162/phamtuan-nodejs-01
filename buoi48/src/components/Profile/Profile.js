"use client";
import "./Profile.scss";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("profile");
  return (
    <Card className="profile">
      <CardBody className="container">
        <h1 className="name">{t("fullname")}</h1>
        <div className="profile-content">
          <div className="profile-left">
            <Image
              src="https://scontent.fhph1-3.fna.fbcdn.net/v/t39.30808-6/313370942_1800895403597560_2958304362541436586_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=VO99TyrVRSMAX93KWxr&_nc_ht=scontent.fhph1-3.fna&oh=00_AfBvrAzRFSx5-foGK91U54kcpz4L7zPVVMYfPlBnxMBwRQ&oe=6571B278"
              className="avatar"
            />
          </div>

          <div className="profile-right">
            <div className="info">
              <h2>{t("info-contact")}</h2>
              <p>
                {t("phone")}:<a href="tel:0397822119">0397822119</a>
              </p>
              <p>
                Mail:
                <a href="mailto:tnpham352@gmail.com">tnpham352@gmail.com</a>
              </p>
              <p>
                Facebook:
                <a href="https://www.facebook.com/profile.php?id=100010313537921">
                  https://www.facebook.com/phamtuan
                </a>
              </p>
              <p>
                Github:
                <a href="https://github.com/phamtuan162">
                  https://github.com/phamtuan162
                </a>
              </p>
              <p>
                {t("interest")}: {t("interest-content")}{" "}
              </p>
              <p>
                {t("study-at")}: {t("school")}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Profile;
