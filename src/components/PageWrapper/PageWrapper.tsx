import { ProfilePanel } from "../ProfilePanel/ProfilePanel"
import { VerticalNav } from "../VerticalNav/VerticalNav"
import { Window } from "../Window/Window"
import styles from "./pagewrapper.module.scss"
import { useEffect, useState } from "react"
import Image from "next/image"
import tiktok from "@/assets/images/social media/tiktok.png"
import instagram from "@/assets/images/social media/instagram.png"
import xlogo from "@/assets/images/social media/x.png"
import pinterest from "@/assets/images/social media/pinterest.png"

export interface IPageWrapperProps {
    children: React.ReactNode
}

type ProfileHeader = { headerText?: string; subHeaderText?: string };

let cachedProfile: ProfileHeader | null = null;
let inflight: Promise<ProfileHeader> | null = null;

async function getProfileOnce(): Promise<ProfileHeader> {
    if (cachedProfile) return cachedProfile;
    if (inflight) return inflight;
    inflight = fetch("/api/profile", { cache: "no-store" })
        .then(async (r) => (r.ok ? ((await r.json()) as ProfileHeader) : ({ headerText: "", subHeaderText: "" })))
        .catch(() => ({ headerText: "", subHeaderText: "" }))
        .then((data) => { cachedProfile = data; inflight = null; return data; });
    return inflight;
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
    const [profile, setProfile] = useState<ProfileHeader | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const data = await getProfileOnce();
            if (mounted) setProfile(data);
        })();
        return () => { mounted = false; };
    }, []);

    return (
        <div className={`pageContainer scrollArea`}>
            <div className={`pageContent`}>
                {children}
            </div>
            <div className={`stickyRight`}>
                <Window header="About Me" showButtons={true}>
                    <ProfilePanel headerText={profile?.headerText || "Hi! I'm Yue ♡"} subHeaderText={profile?.subHeaderText || "Welcome to my digital diary!"} />
                </Window>
                <VerticalNav />
                <Window>
                    <div className={styles.navFooter}>
                        <div className={styles.copyright}>
                            Copyright © 2025
                        </div>
                        <div className={styles.socialMedia}>
                            <Image src={tiktok} alt="tiktok" />
                            <Image src={instagram} alt="instagram" />
                            <Image src={xlogo} alt="x" />
                            <Image src={pinterest} alt="pinterest" />
                        </div>
                    </div>
                </Window>
            </div>
        </div>
    )
}