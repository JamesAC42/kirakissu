"use client";

import { Button } from "@/components/Button/Button";
import styles from "./page.module.scss";
import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { Window } from "@/components/Window/Window";
import Image from "next/image";
import { useRouter } from "next/navigation";

import magnifyingglass from "@/assets/images/icons/magnifyingglass.png";

import magazine from "@/assets/images/blog/magazine cover.jpg";
import magazine2 from "@/assets/images/blog/magazine cover 2.jpg";
import magazine3 from "@/assets/images/blog/magazine cover 3.jpg";

import calendar from "@/assets/images/icons/calendar.png";
import eye from "@/assets/images/icons/eye.png";
import heart from "@/assets/images/icons/heart.png";
import comment from "@/assets/images/icons/comment.png";
import time from "@/assets/images/icons/time.png";

import kumabubble from "@/assets/images/blog/kumabubble.png";

const PostItem = () => {

    const thumbnail = [magazine, magazine2, magazine3][Math.floor(Math.random() * 3)];

    return (
        <div className={`${styles.post} windowStyle`}>
            <div className={styles.postImage}>
                <Image src={thumbnail} alt="featured post" width={450} height={610} />
            </div>
            <div className={styles.postContent}>
                <h3>Featured Post Title Here</h3>
                <h4>Subtitle is here</h4>
                <div className={styles.postDate}>
                    <Image src={calendar} alt="calendar" width={16} height={16} />
                    <span> October 1, 2024</span>
                </div>
                <div className={styles.postTime}>
                    <Image src={time} alt="time" width={16} height={16} />
                    <span>4 min. read</span>
                </div>
                <div className={styles.postDetails}>
                    <Image src={eye} alt="eye" width={16} height={16} />
                    <span>8</span>
                    <Image src={heart} alt="heart" width={16} height={16} />
                    <span>2</span>
                    <Image src={comment} alt="comment" width={16} height={16} />
                    <span>2</span>
                </div>
                <div className={styles.postTags}>
                    <div className={styles.postTag}>Music</div>
                    <div className={styles.postTag}>Art</div>
                    <div className={styles.postTag}>Life</div>
                </div>
            </div>
        </div>
    )
}

export default function Blog() {

    const router = useRouter();
    return (
        <PageWrapper>
            <HeaderBox header="Blog" subtitle2="Articles and ramblings on music, art, life, and other random things!" showFlashy={false}/>

            <div className={styles.blogSection}>
                <div className={styles.featuredPosts}>
                    <Window>
                        <div className={styles.featuredPostsTitle}>
                            <h2>Featured Post</h2>
                        </div>
                    </Window>
                    <div className={styles.featuredPostsList}>
                        <div
                            onClick={() => {
                                router.push("/blog/article-title");
                            }}
                            className={`${styles.post} windowStyle ${styles.mainFeaturedPost}`}>
                            <div className={styles.postImage}>
                                <Image src={magazine} alt="featured post" width={450} height={610} />
                            </div>
                            <div className={styles.postContent}>
                                <h3>How I Learned to Stop Worrying and Love the Pixel Art</h3>
                                <h4>Subtitle is here</h4>
                                <div className={styles.postDate}>
                                    <p>October 1, 2024</p>
                                </div>
                                <div className={styles.postDate}>
                                    <p>4 min. read</p>
                                </div>
                                <div className={styles.postDate}>
                                    <span>8 views</span>
                                    <span>2 likes</span>
                                </div>
                                <div className={styles.postTags}>
                                    <div className={styles.postTag}>Music</div>
                                    <div className={styles.postTag}>Art</div>
                                    <div className={styles.postTag}>Life</div>
                                </div>
                            </div>
                        </div>
                        <Image src={kumabubble} alt="kumabubble" width={500} height={500} className={styles.kumabubble} />
                    </div>
                </div>
                <div className={styles.filterOuter}>
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Search..." />
                        <div className={styles.searchIconContainer}>
                            <Image
                                className={styles.searchIcon}
                                src={magnifyingglass} 
                                alt="search" 
                                width={66} 
                                height={66} />
                        </div>
                    </div>
                    <div className={styles.tagsContainer}>
                        <div className={styles.tag}>All</div>
                        <div className={`${styles.tag} ${styles.activeTag}`}>Music</div>
                        <div className={styles.tag}>Art</div>
                        <div className={styles.tag}>Life</div>
                        <div className={styles.tag}>Gaming</div>
                        <div className={styles.tag}>Cooking</div>
                        <div className={styles.tag}>Health & Beauty</div>
                    </div>
                    <div className={styles.sortContainer}>
                        <div className={styles.sortTitle}>Sort:</div>
                        <Button text="Newest" onClick={() => {}} />
                        <Button text="Oldest" onClick={() => {}} />
                        <Button text="Popular" onClick={() => {}} />
                    </div>
                </div>
            </div>
            <div className={styles.blogPostsSection}>
                <Window>
                    <div className={styles.blogPostsTitle}>
                        <h2>Blog Posts</h2>
                        <h4>Category: All | Sort: Newest</h4>
                    </div>
                </Window>
                <div className={styles.blogPosts}>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                    <PostItem/>
                </div>
                <div className={styles.pagination}>
                    <Button text="< Previous" onClick={() => {}} />
                    <Button text="1" onClick={() => {}} />
                    <Button text="2" onClick={() => {}} />
                    <Button text="3" onClick={() => {}} />
                    <Button text="4" onClick={() => {}} />
                    <Button text="5" onClick={() => {}} />
                    <Button text="Next >" onClick={() => {}} />
                </div>
            </div>
        </PageWrapper>
    )
}