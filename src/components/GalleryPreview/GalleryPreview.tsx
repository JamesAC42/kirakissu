import styles from "./gallerypreview.module.scss";

import Image from "next/image";
import cookies from "@/assets/images/gallery/cookies.jpg";
import japan from "@/assets/images/gallery/japan.jpg";
import kon from "@/assets/images/gallery/kon.jpg";
import nichijou from "@/assets/images/gallery/nichijou.jpg";
import popteen from "@/assets/images/gallery/popteen.jpg";
import { Window } from "../Window/Window";
import { Button } from "../Button/Button";

export const GalleryPreview = () => {
    return (
        <>
            <div className={styles.galleryPreview}>
                <div className={styles.galleryPreviewItem}>
                    <Window>
                        <Image src={cookies} alt="cookies" />
                        <span>cookies I made recently</span>
                    </Window>
                </div>
                <div className={styles.galleryPreviewItem}>
                    <Window>
                        <Image src={japan} alt="japan" />
                        <span>a cool bus in japan</span>
                    </Window>
                </div>
                <div className={styles.galleryPreviewItem}>
                    <Window>
                        <Image src={kon} alt="kon" />
                        <span>k-on poster I'd like to have</span>
                    </Window>
                </div>
                <div className={styles.galleryPreviewItem}>
                    <Window>
                        <Image src={popteen} alt="popteen" />
                        <span>magazine cover vv inspirational</span>
                    </Window>
                </div>
            </div>
            <div className={styles.viewMore}>
                <Button text="view more" onClick={() => {}} />
            </div>
        </>
    )
}