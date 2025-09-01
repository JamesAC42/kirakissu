import styles from "./statuspanel.module.scss";

export type IStatusPanelData = object;

export const StatusPanel = (props: {data: IStatusPanelData}) => {
    return (
        <div className={`windowContent`}>
            {Object.entries(props.data).map(([key, value]) => (
                <p key={key}><span className={styles.bold}>{key}:</span> {value}</p>
            ))}
        </div>
    );
};