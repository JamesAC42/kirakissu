import styles from "./gallerypreview.module.scss";

import Image from "next/image";
import cookies from "@/assets/images/gallery/cookies.jpg";
import japan from "@/assets/images/gallery/japan.jpg";
import kon from "@/assets/images/gallery/kon.jpg";
import nichijou from "@/assets/images/gallery/nichijou.jpg";
import popteen from "@/assets/images/gallery/popteen.jpg";
import { Window } from "../Window/Window";

export const GalleryPreview = () => {
    return (
        <div className={styles.galleryPreview}>
            <div className={styles.galleryPreviewItem}>
                <Window>
                    <Image src={cookies} alt="cookies" />
                    cookies I made recently
                </Window>
            </div>
            <div className={styles.galleryPreviewItem}>
                <Window>
                    <Image src={japan} alt="japan" />
                    a cool bus in japan
                </Window>
            </div>
            <div className={styles.galleryPreviewItem}>
                <Window>
                    <Image src={kon} alt="kon" />
                    k-on poster I'd like to have
                </Window>
            </div>
            <div className={styles.galleryPreviewItem}>
                <Window>
                    <Image src={nichijou} alt="nichijou" />
                    nichijou art!
                </Window>
            </div>
            <div className={styles.galleryPreviewItem}>
                <Window>
                    <Image src={popteen} alt="popteen" />
                    magazine cover vv inspirational
                </Window>
            </div>
        </div>
    )
}