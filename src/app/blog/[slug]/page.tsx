"use client";

import styles from "./blogpost.module.scss";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import HeaderBox from "@/components/HeaderBox/HeaderBox";
import Image from "next/image";
import calendar from "@/assets/images/icons/calendar.png";
import time from "@/assets/images/icons/time.png";
import eye from "@/assets/images/icons/eye.png";
import heart from "@/assets/images/icons/heart.png";
import comment from "@/assets/images/icons/comment.png";
import share from "@/assets/images/icons/share.png";
import { Window } from "@/components/Window/Window";

export default function BlogPost() {
    return (
        <PageWrapper>
            <HeaderBox header="How I Learned to Stop Worrying and Love the Pixel Art" subtitle2="All about my journey into pixel art." showFlashy={false}>
                <div className={styles.postDetailsContainer}>
                    <div className={styles.postDetails}>
                        <div className={styles.postDetail}>
                            <Image src={calendar} alt="calendar" width={16} height={16} />
                            <p>September 1, 2025</p>
                        </div>
                        <div className={styles.postDetail}>
                            <Image src={time} alt="time" width={16} height={16} />
                            <p>4 min. read</p>
                        </div>
                    </div>
                    <div className={styles.postDetails}>
                        <div className={styles.postDetail}>
                            <Image src={eye} alt="eye" width={16} height={16} />
                            <p>8 views</p>
                        </div>
                        <div className={styles.postDetail}>
                            <Image src={heart} alt="heart" width={16} height={16} />
                            <p>2 likes</p>
                        </div>
                        <div className={styles.postDetail}>
                            <Image src={comment} alt="comment" width={16} height={16} />
                            <p>2 comments</p>
                        </div>
                        <div className={styles.postDetail}>
                            <Image src={share} alt="share" width={16} height={16} />
                            <p>2 shares</p>
                        </div>
                    </div>
                </div>
                
                <div className={styles.postActions}>
                    <div className={styles.postAction}>
                        <Image src={heart} alt="heart" width={16} height={16} />
                    </div>
                    <div className={styles.postAction}>
                        <Image src={comment} alt="comment" width={16} height={16} />
                    </div>
                    <div className={styles.postAction}>
                        <Image src={share} alt="share" width={16} height={16} />
                    </div>
                </div>
                
            </HeaderBox>
            <br/>
            <Window>
                <div className={styles.postContent}>

                </div>
            </Window>
        </PageWrapper>
    )
}
