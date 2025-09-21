import styles from "./statuspanel.module.scss";

import spinningCat from "@/assets/images/spinningcat.gif";
import Image from "next/image";

export type IStatusPanelData = object;

export const StatusPanel = (props: {data: IStatusPanelData}) => {
    return (
        <div className={`windowContent`}>
            {Object.entries(props.data).map(([key, value]) => (
                <p key={key}><span className={styles.bold}>{key}:</span> {value}</p>
            ))}
            <div className={styles.spinningCatContainer}>
                <Image src={spinningCat} className={styles.spinningCat} alt="spinning cat" width={100} height={100} />
                <Image src={spinningCat} className={styles.spinningCat} alt="spinning cat" width={100} height={100} />
                <Image src={spinningCat} className={styles.spinningCat} alt="spinning cat" width={100} height={100} />
            </div>
        </div>
    );
};