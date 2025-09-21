"use client";

import { Button } from "../Button/Button";
import styles from "./verticalnav.module.scss";
import {usePathname} from "next/navigation";
import { Window } from "../Window/Window";
import Link from "next/link";

import home from "@/assets/images/icons/home.png";
import love from "@/assets/images/icons/love.png";
import blog from "@/assets/images/icons/blog.png";
import diary from "@/assets/images/icons/diary.png";
import scrapbook from "@/assets/images/icons/scrapbook.png";
import guestbook from "@/assets/images/icons/guestbook.png";
import Image from "next/image";

export const VerticalNav = () => {
    const pathname = usePathname();

    return (
        <Window header="quick links">
            <div className={`windowContent`}>
                <div className={`${styles.verticalNav}`}>
                    <Link href="/" className={styles.navLink}>
                        <Button active={pathname === "/"} icon={home} text="Home"/>
                    </Link>
                    <Link href="/aboutme" className={styles.navLink}>
                        <Button active={pathname === "/aboutme"} icon={love} text="About Me"/>
                    </Link>
                    <Link href="/blog" className={styles.navLink}>
                        <Button active={pathname.startsWith("/blog")} icon={blog} text="Blog"/>
                    </Link>
                    <Link href="/diary" className={styles.navLink}>
                        <Button active={pathname.startsWith("/diary")} icon={diary} text="Diary"/>
                    </Link>
                    <Link href="/scrapbook" className={styles.navLink}>
                        <Button active={pathname === "/scrapbook"} icon={scrapbook} text="Scrapbook"/>
                    </Link>
                    <Link href="/guestbook" className={styles.navLink}>
                        <Button active={pathname === "/guestbook"} icon={guestbook} text="Guestbook"/>
                    </Link>
                </div>
            </div>
        </Window>
    )
}