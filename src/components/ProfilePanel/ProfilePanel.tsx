import styles from "./profilepanel.module.scss";
import Image from "next/image";
import yawnprofile from "@/assets/images/homepage/yawn.png";
import japanflag from "@/assets/images/flags/japan.png";
import koreaflag from "@/assets/images/flags/korea.png";
import usaflag from "@/assets/images/flags/usa.png";

export interface IProfilePanelProps {
    headerText?: string;
    subHeaderText?: string;
}

export const ProfilePanel = (data: IProfilePanelProps) => {
    return (
        <div className={`windowContent ${styles.aboutMe}`}>
          <div className={styles.profilePictureContainer}>
              <Image src={yawnprofile} alt="profile" className={styles.profileImage} />
          </div>
          <p className={styles.hi}>{data.headerText}</p>
          <p>{data.subHeaderText}</p>
          <p>Languages: English, Japanese, Korean</p>
          <p className={styles.flags}>
            <Image src={japanflag} alt="japan" width={40} height={40} />
            <Image src={koreaflag} alt="korea" width={40} height={40} />
            <Image src={usaflag} alt="usa" width={40} height={40} />
          </p>
        </div>
    );
};
