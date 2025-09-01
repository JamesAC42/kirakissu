import styles from "./blogpanel.module.scss";
import { Button } from "../Button/Button";
import { Window } from "../Window/Window";
import Image from "next/image";
import sheep from "@/assets/images/homepage/sheep.gif";
import sailormoonstamp from "@/assets/images/stamps/sailormoon.png";

export interface IBlogPost {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
}

export interface IBlogPanelProps {
    recentPosts: IBlogPost[];
    popularPosts: IBlogPost[];
}

export const BlogPanel = (props: IBlogPanelProps) => {

    return (
        <div className={`windowContent ${styles.blogPostContainer} scrollArea`}>
            <div className={styles.blogInfo}>
                <div className={styles.blogCategories}>
                    <Button text="music" onClick={() => {}} />
                    <Button text="art" onClick={() => {}} />
                    <Button text="life" onClick={() => {}} />
                    <Button text="gaming" onClick={() => {}} />
                    <Button text="cooking" onClick={() => {}} />
                    <Button text="health & beauty" onClick={() => {}} />
                    <Button text="fashion" onClick={() => {}} />
                    <Button text="music" onClick={() => {}} />
                </div>

                <div className={styles.sheepContainer}>
                    <Window>
                        <Image src={sheep} alt="sheep" />
                    </Window>
                    <Window>
                        <Image src={sailormoonstamp} alt="sailormoon" />
                    </Window>
                </div>
                </div>
                <div className={styles.blogContent}>
                <div className={styles.blogSection}>
                    <div className={styles.blogCategoryTitle}>
                        <h2>recent posts</h2>
                    </div>

                    {
                        props.recentPosts.length > 0 && props.recentPosts.map((post) => (
                        <div className={styles.blogItem} key={post.id}>
                            <h3>{post.title} <span className={styles.blogTags}><span className={styles.blogTag}>{post.tags[0]}</span><span className={styles.blogTag}>{post.tags[1]}</span></span></h3>
                            <div className={styles.blogDate}>{post.date}</div>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.blogSection}>
                    <div className={styles.blogCategoryTitle}>
                        <h2>popular posts</h2>
                    </div>
                    
                    {
                        props.popularPosts.length > 0 && props.popularPosts.map((post) => (
                        <div className={styles.blogItem} key={post.id}>
                            <h3>{post.title} <span className={styles.blogTags}><span className={styles.blogTag}>{post.tags[0]}</span><span className={styles.blogTag}>{post.tags[1]}</span></span></h3>
                            <div className={styles.blogDate}>{post.date}</div>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}