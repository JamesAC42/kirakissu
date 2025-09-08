import { ProfilePanel } from "../ProfilePanel/ProfilePanel"
import { VerticalNav } from "../VerticalNav/VerticalNav"
import { Window } from "../Window/Window"
import styles from "./pagewrapper.module.scss"
import Image from "next/image"
import tiktok from "@/assets/images/social media/tiktok.png"
import instagram from "@/assets/images/social media/instagram.png"
import xlogo from "@/assets/images/social media/x.png"
import pinterest from "@/assets/images/social media/pinterest.png"

export interface IPageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
    return (
        <div className={`pageContainer scrollArea`}>
            <div className={`pageContent`}>
                {children}
            </div>
            <div className={`stickyRight`}>
                <Window header="About Me" showButtons={true}>
                    <ProfilePanel headerText="Hi! I'm Yue ♡" subHeaderText="Welcome to my digital diary!" />
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