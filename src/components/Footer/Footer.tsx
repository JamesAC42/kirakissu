import styles from "./footer.module.scss";
import { Window } from "../Window/Window";
import Image from "next/image";
import sakura from "@/assets/images/sakura.png";

export const Footer = ({ lastUpdated }: { lastUpdated?: string }) => {
    return (
        
        <Window>
            <div className={`windowContent ${styles.footerOuter}`}>
                <div className={styles.footerContainer}>
                    <p>made with ♡ copyright 2025 kirakissu</p>
                    <p>best viewed in desktop mode • 1920x1080</p>
                    {
                        lastUpdated && (
                            <p>last updated: {lastUpdated}</p>
                        )
                    }
                    <p>questions? feedback? contact me @ <a href="mailto:admin@kirakissu.com">admin@kirakissu.com</a></p>
                    <div className={styles.footerImageLeft}>
                        <Image src={sakura} alt="sakura" className={styles.paneImage} />
                    </div>
                    <div className={styles.footerImageRight}>
                        <Image src={sakura} alt="sakura" className={styles.paneImage} />
                    </div>
                </div>
            </div>
        </Window>
    );
};
