"use client";
import "./Profile.scss";
import { Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("profile");
  return (
    <Card className="profile">
      <CardBody className="container">
        <h1 className="name">{t("fullname")}</h1>
        <div className="profile-content">
          <div className="profile-left">
            <img
              src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/313370942_1800895403597560_2958304362541436586_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=IlKxwU2bkwsAX85hxCC&_nc_ht=scontent.fhan14-1.fna&oh=00_AfDTX8rJMLo7xbnfB599bUDgBL5z12qXpyIw450reeCyJQ&oe=6567CF38"
              alt=""
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
