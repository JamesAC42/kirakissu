import { Window } from "../Window/Window";
import Image from "next/image";
import styles from "./headerbox.module.scss";
import daisuki from "@/assets/images/homepage/daisukiclear.png";
import bowbackground from "@/assets/images/backgrounds/bows.jpg";

export interface IHeaderBoxProps {
    header: string;
    subtitle: string;
    subtitle2: string;
    showFlashy: boolean;
    children: React.ReactNode;
}

export const HeaderBox = ({header, subtitle, subtitle2, showFlashy = false, children}: IHeaderBoxProps) => {
    return (
        <Window>
            <div className={styles.headerContent}>
                <div className={`windowContent`}>
                    <div className={styles.bowBackgroundContainer}>
                        <Image src={bowbackground} alt="bow background" width={946} height={2048} className={styles.bowBackground} />
                    </div>
                    <div className={styles.headerContentInner}>
                    <h1 className={styles.headerTitle}>{header}</h1>
                    <p className={styles.headerSubtitle}>
                        {
                            subtitle && (
                                <>
                                    <span className={styles.headerSubtitleText}>{subtitle}</span> 
                                    <br/>
                                </>
                            )
                        }
                        {
                            subtitle2 && (
                                <>
                                    <span className={styles.headerSubtitleText2}>{subtitle2}</span> 
                                </>
                            )
                        }
                    </p>
                    
                    {
                        showFlashy && (
                            <span className={styles.headerDecorTopRight}>
                                <Image src={daisuki} alt="daisuki" width={500} height={500} />
                            </span>
                        )
                    }

                    {
                        children && (
                            children
                        )
                    }
                </div>
            </div>
            </div>
        </Window>
    )
}

export default HeaderBox;