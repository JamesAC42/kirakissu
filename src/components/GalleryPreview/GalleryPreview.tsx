import styles from "./gallerypreview.module.scss";

import Image from "next/image";
import { Window } from "../Window/Window";
import { Button } from "../Button/Button";

export interface IGalleryPreviewProps {
    images: {
        src: string;
        alt: string;
        caption: string;
    }[];
}

export const GalleryPreview = (props: IGalleryPreviewProps) => {
    return (
        <>
            <div className={styles.galleryPreview}>
                {
                    props.images.map((image) => (
                        <div className={styles.galleryPreviewItem} key={image.alt}>
                            <Window>
                                <Image src={image.src} width={100} height={100} alt={image.alt} />
                                <span>{image.caption}</span>
                            </Window>
                        </div>
                    ))
                }
            </div>
            <div className={styles.viewMore}>
                <Button text="view more" onClick={() => {}} />
            </div>
        </>
    )
}