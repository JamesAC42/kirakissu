"use client";

import { Button } from "../Button/Button";
import styles from "./verticalnav.module.scss";
import {useRouter, usePathname} from "next/navigation";
import { Window } from "../Window/Window";

export const VerticalNav = () => {
    const router = useRouter();
    const pathname = usePathname();

    console.log(pathname);

    return (
        <Window header="quick links">
            <div className={`windowContent`}>
                <div className={`${styles.verticalNav}`}>
                    <Button text="Home" onClick={() => router.push("/")} active={pathname === "/"} />
                    <Button text="About Me" onClick={() => router.push("/aboutme")} active={pathname === "/aboutme"} />
                    <Button text="Blog" onClick={() => router.push("/blog")} active={pathname === "/blog"} />
                    <Button text="Diary" onClick={() => router.push("/diary")} active={pathname === "/diary"} />
                    <Button text="Scrapbook" onClick={() => router.push("/scrapbook")} active={pathname === "/scrapbook"} />
                    <Button text="Guestbook" onClick={() => router.push("/guestbook")} active={pathname === "/guestbook"} /> 
                </div>
            </div>
        </Window>
    )
}