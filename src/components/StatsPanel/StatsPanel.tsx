import { useEffect, useState } from "react";
import styles from "./statspanel.module.scss";

interface IStatsData {
    totalVisits: number;
    onlineNow: number;
    mostVisitedPage: string;
    mostActiveHour: string;
    averageVisitDuration: string;
}

export const StatsPanel = () => {
    
    const [stats, setStats] = useState<IStatsData | null>(null);
        useEffect(() => {
        const fetchStats = async () => {
            const stats = await fetch("/api/stats");
            if (!stats.ok) {
                throw new Error("Failed to fetch stats");
            }

            const json = await stats.json();
            setStats(json);
        };
        fetchStats();
    }, []);

    return (
        <div className={`windowContent`}>
            <div className={styles.statsContainer}>
                {stats && (
                    <>
                    {
                        Object.entries(stats).map(([key, value]) => (
                            <p key={key}><span className={styles.statTitle}>{key}:</span> {value}</p>
                        ))
                    }
                    </>
                )}
                </div>
        </div>
    )
};