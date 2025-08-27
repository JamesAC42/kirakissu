"use client";

import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";

import { Welcome } from "@/components/Welcome/Welcome";
import { Window } from "@/components/Window/Window";
import { Button } from "@/components/Button/Button";
import angellover from "@/assets/images/blinkies/angellover.gif";
import pinkpink from "@/assets/images/blinkies/pinkpink.gif";
import gyarulover from "@/assets/images/blinkies/gyarulove.gif";
import whereami from "@/assets/images/blinkies/whereami.gif";
import yoursweetness from "@/assets/images/blinkies/yoursweetness.gif";
import dokidoki from "@/assets/images/blinkies/dokidoki.gif";
import pastelangel from "@/assets/images/blinkies/pastelangel.gif";
import mikufan from "@/assets/images/blinkies/mikufan.gif";
import kawaii from "@/assets/images/blinkies/kawaii.gif";
import hellokitty from "@/assets/images/blinkies/hellokitty.gif";

import daisuki from "@/assets/images/daisukiclear.png";

import Image from "next/image";
import bowbackground from "@/assets/images/backgrounds/bows.jpg";

import tommyairline from "@/assets/images/tommyairline.jpg";
import { Calendar } from "@/components/Calendar/Calendar";

import yawnprofile from "@/assets/images/yawn.jpg";
import glasscat from "@/assets/images/glasscat.png";
import { GalleryPreview } from "@/components/GalleryPreview/GalleryPreview";
import { MediaPlayer } from "@/components/MediaPlayer/MediaPlayer";
import Anilist from "@/components/Anilist/Anilist";

import { StickerContainer } from "@/components/StickerContainer/StickerContainer";

export default function Home() {

  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [catState, setCatState] = useState(1);

  const incrementCatState = (id: number) => {
    if (catState === id) {
      setCatState(catState === 4 ? 1 : catState + 1);
    }
  }
  
  const onEnter = () => { 
    setHasSeenWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  }

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setHasSeenWelcome(true);
    } else {
      setHasSeenWelcome(false);
    }
  }, []);

  if (hasSeenWelcome === null) {
    return <div className={styles.loadingContainer}></div>
  }
  return (
    <>
      {
      hasSeenWelcome ? 
      <Welcome onEnter={onEnter}/> 
      : 
      <div className={`${styles.homeContainer} scrollArea`}>
        {/* Left rail: About / Status */}
        <div className={styles.stickyLeft}>
          <Window header="about me" showButtons={true}>
            <div className={`${styles.windowContent} ${styles.aboutMe}`}>
              <div className={styles.profilePictureContainer}>
                <Window>
                  <div className={styles.windowContent}>
                    <Image src={yawnprofile} alt="profile" width={100} height={100} />
                  </div>
                </Window>
              </div>
              <p>hi! i'm yuè ♡<br/> ギャル好きの開発者</p>
              <p>this is my personal website and a little bit about me</p>
              <p>likes: pink, マカロン, glitter, 写真集</p>
              <p>I'd like to share my thoughts and adventures with you!</p>
              <p>languages: English, Japanese, Korean</p>
            </div>
          </Window>
          <Window header="status" showButtons={true}>
            <div className={styles.windowContent}>
              <p><span className={styles.bold}>mood:</span> ✨ きらきら ✨</p>
              <p><span className={styles.bold}>watching:</span> セーラームーン</p>
              <p><span className={styles.bold}>playing:</span> osu!</p>
            </div>
          </Window>
          <Window header="mood" showButtons={true}>
            <div className={styles.windowContent}>
              <p>current mood: ♡ dreamy ♡</p>
              <p>現在の気分：ゆめかわ</p>
            </div>
          </Window>
        </div>

        {/* Main column */}
        <div className={styles.homeContainerInner}>
          {/* Hero header */}
          <div id="top" />
          <div className={styles.windowsGrid}>
            <div className={`${styles.spanFull} ${styles.headerContainer}`}>
              <Window>
                <div className={styles.headerContent}>
                  <div className={styles.windowContent}>
                    <div className={styles.bowBackgroundContainer}>
                      <Image src={bowbackground} alt="bow background" width={946} height={2048} className={styles.bowBackground} />
                    </div>
                    <div className={styles.headerContentInner}>
                      <h1 className={styles.headerTitle}>kirakissu</h1>
                      <p className={styles.headerSubtitle}><span className={styles.headerSubtitleText}>いらっしゃいませ!</span> 
                      <br/>
                      <span className={styles.headerSubtitleText2}>Welcome to my pink corner of the web</span> </p>
                      <span className={styles.headerDecorTopRight}>
                        <Image src={daisuki} alt="daisuki" width={500} height={500} />
                      </span>
                      <div className={styles.navButtons}>
                        <Button text="Blog" onClick={() => scrollToId("blog")} />
                        <Button text="About Me" onClick={() => scrollToId("gallery")} />
                        <Button text="Diary" onClick={() => scrollToId("favorites")} />
                        <Button text="Scrapbook" onClick={() => scrollToId("guestbook")} />
                        <Button text="Guestbook" onClick={() => scrollToId("quiz")} />
                      </div>
                    </div>
                  </div>
                </div>
              </Window>
            </div>

            {/* Blinkies strip */}
            <div className={styles.spanFull}>
              <Window>
                <div className={styles.windowContent}>
                  <div className={styles.blinkiesRow}>
                    <Image src={angellover} alt="blinkie" width={150} height={20} />
                    <Image src={pinkpink} alt="blinkie" width={150} height={20} />
                    <Image src={gyarulover} alt="blinkie" width={150} height={20} />
                    <Image src={whereami} alt="blinkie" width={150} height={20} />
                    <Image src={yoursweetness} alt="blinkie" width={150} height={20} />
                    <Image src={dokidoki} alt="blinkie" width={150} height={20} />
                    <Image src={pastelangel} alt="blinkie" width={150} height={20} />
                    <Image src={mikufan} alt="blinkie" width={150} height={20} />
                    <Image src={kawaii} alt="blinkie" width={150} height={20} />
                    <Image src={hellokitty} alt="blinkie" width={150} height={20} />
                  </div>
                </div>
              </Window>
            </div>

            {/* Blog preview */}
            <div id="blog" className={styles.span8}>
              <Window header="diary" showButtons={true} contentClass={`${styles.blogWindow} scrollArea`}>
                <div className={styles.windowContent}>
                  <div className={styles.blogEntry}>
                    <h3>2025-01-01「はじめまして」</h3>
                    <p>New year, new vibes ♡ Finally launched my little corner of the web after weeks of coding! Currently sipping strawberry milk and adding the finishing touches. I have so many ideas for future posts about fashion, music, and my daily life in Tokyo. Hope you'll join me on this journey!</p>
                    <div className={styles.blogButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>

                    <div className={styles.blogStickerContainer}>
                      <StickerContainer blogId="2025-01-01" />
                    </div>
                  </div>
                  <div className={styles.blogEntry}>
                    <h3>2024-12-24「クリスマスイブ」</h3>
                    <p>Spent Christmas Eve at the Harajuku illuminations with friends! The streets were so magical with all the twinkling lights. Picked up some adorable accessories at KIDDY LAND and had the most delicious strawberry crepe at my favorite cafe. Perfect end to 2024 ✧˖°</p>
                    <div className={styles.blogButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>

                    <div className={styles.blogStickerContainer}>
                      <StickerContainer blogId="2024-12-24" />
                    </div>
                  </div>
                  <div className={styles.blogEntry}>
                    <h3>2024-12-20「新しいカメラ」</h3>
                    <p>Got my hands on a pastel pink instax mini! Can't wait to fill my scrapbook with dreamy polaroids. Testing it out today at the cat cafe with Mai-chan. The lighting is perfect and the cats are being extra photogenic ฅ^•ﻌ•^ฅ</p>
                    <div className={styles.blogButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>
                    <div className={styles.blogStickerContainer}>
                      <StickerContainer blogId="2025-01-01" />
                    </div>
                  </div>
                </div>
              </Window>
            </div>

            {/* Music */}
            <div id="music" className={styles.span4}>
              <Window header="music playlist" showButtons={true}>
                <div className={styles.windowContent}>
                  <MediaPlayer />
                </div>
              </Window>
              <br/>
              <Window>
                <div className={`${styles.windowContent} ${styles.tommyAirline}`}>
                  <Image src={tommyairline} alt="tommyairline" width={248} height={247} />

                  <div className={styles.tommyAirlineText}>
                  私のお気に入りのアルバムです！
                  </div>
                </div>
              </Window>
            </div>

            
            {/* FAQ */}
            <div id="faq" className={styles.spanFull}>
              <Window header="FAQ" showButtons={true}>
                <div className={styles.windowContent}>
                  <div className={styles.faqItem}>
                    <h3>What is this website?</h3>
                    <p>This is my personal website where I share my interests in Japanese culture, music, fashion and more! I wanted to create a cozy space that feels like a digital diary ♡</p>
                  </div>
                  <div className={styles.faqItem}>
                    <h3>How often do you update?</h3>
                    <p>I try to update at least once a week with new blog posts, photos, and music recommendations! The site is always evolving as I learn new things.</p>
                  </div>
                  <div className={styles.faqItem}>
                    <h3>What inspired the design?</h3>
                    <p>The aesthetic is inspired by Y2K web design, Japanese kawaii culture, and nostalgic elements like Windows 98. I wanted it to feel both retro and modern!</p>
                  </div>
                  <div className={styles.faqItem}>
                    <h3>Can I contact you?</h3>
                    <p>Yes! Feel free to reach out through any of my social media links. I love connecting with others who share similar interests ✧˖°</p>
                  </div>
                </div>
              </Window>
            </div>


            <div className={styles.span2}>
              <Window>
                <div 
                  className={styles.glassCatContainer}
                  onMouseEnter={() => incrementCatState(1)}>
                  <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 1 ? styles.glassCatActive : ""}`} />
                </div>
              </Window>
            </div>

            {/* Gallery */}
            <div id="gallery" className={styles.span10}>
              <Window header="photo gallery" showButtons={true}>
                <div className={styles.windowContent}>
                  <GalleryPreview />
                </div>
              </Window>
            </div>

            {/* Favorites */}
            <div id="favorites" className={styles.span6}>
              <Window header="my favorite things" showButtons={true}>
                <div className={styles.windowContent}>
                  <ul className={styles.favoritesList}>
                    <li><strong>song:</strong> ピーチソーダ</li>
                    <li><strong>makeup:</strong> glitter liner</li>
                    <li><strong>skincare:</strong> jelly mask</li>
                    <li><strong>snack:</strong> strawberry pocky</li>
                    <li><strong>drink:</strong> bubble tea</li>
                    <li><strong>accessory:</strong> hair bows</li>
                    <li><strong>color:</strong> pastel pink</li>
                    <li><strong>season:</strong> spring</li>
                  </ul>
                </div>
              </Window>
            </div>

            {/* Poll */}
            <div className={styles.span4}>
              <Window header="poll" showButtons={true}>
                <div className={styles.windowContent}>
                  <p>who is your favorite sanrio character? サンリオは誰が好き？</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert("ありがとう ♡"); }}>
                    <div className={styles.pollForm}>
                      <label><input type="radio" name="sanrio" /> my melody</label>
                      <label><input type="radio" name="sanrio" /> kuromi</label>
                      <label><input type="radio" name="sanrio" /> cinnamoroll</label>
                      <label><input type="radio" name="sanrio" /> hello kitty</label>
                    </div>
                    <div style={{ marginTop: "0.5rem" }}>
                      <Button text="Vote" onClick={() => {}} />
                    </div>
                  </form>
                </div>
              </Window>
            </div>

            <div className={styles.span2}>
              <Window>
                <div 
                  className={styles.glassCatContainer}
                  onMouseEnter={() => incrementCatState(2)}>
                  <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 2 ? styles.glassCatActive : ""}`}/>
                </div>
              </Window>
            </div>

            {/* Quiz / Survey */}
            <div id="quiz" className={styles.span7}>
              <Window header="quiz / survey" showButtons={true}>
                <div className={styles.windowContent}>
                  <p>tiny quiz coming soon. クイズで遊ぼう！</p>
                  <Button text="Start" onClick={() => {}} />
                </div>
              </Window>
            </div>

            {/* Guestbook */}
            <div id="guestbook" className={styles.span5}>
              <Window header="guestbook" showButtons={true}>
                <div className={styles.windowContent}>
                  <p>leave me a message — 足跡残してね</p>
                  <Button text="Sign guestbook" onClick={() => {}} />
                </div>
              </Window>
            </div>


            <div className={styles.span2}>
              <Window>
                <div 
                  className={styles.glassCatContainer}
                  onMouseEnter={() => incrementCatState(3)}>
                  <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 3 ? styles.glassCatActive : ""}`}/>
                </div>
              </Window>
            </div>

            {/* To-do */}
            <div id="todo" className={styles.span3}>
              <Window header="to-do" showButtons={true}>
                <div className={styles.windowContent}>
                  <p>to-do list coming soon. タスクで遊ぼう！</p>
                  <Button text="Start" onClick={() => {}} />
                </div>
              </Window>
            </div>

            {/* blog posts   */}
            <div id="blogpost" className={styles.span7}>
              <Window header="blog posts" showButtons={true}>
                <div className={styles.windowContent}>
                  <p>blog post coming soon. ブログで遊ぼう！</p>
                  <Button text="Start" onClick={() => {}} />
                </div>
              </Window>
            </div>

            {/* Ani-list */}
            <div id="anilist" className={styles.spanFull}>
              <Window header="anilist" showButtons={true}>
                <div className={styles.windowContent}>
                  <Anilist user="yuckitsyue" />
                </div>
              </Window>
            </div>

            {/* Analytics */}
            <div id="analytics" className={styles.span10}>
              <Window header="site stats" showButtons={true}>
                <div className={styles.windowContent}>
                  <div className={styles.statsContainer}>
                    <p><span className={styles.statTitle}>total visits:</span> 1,234</p>
                    <p><span className={styles.statTitle}>online now:</span> 5</p>
                    <p><span className={styles.statTitle}>most visited page:</span> gallery</p>
                    <p><span className={styles.statTitle}>most active hour:</span> 3pm JST</p>
                    <p><span className={styles.statTitle}>average visit duration:</span> 5m 23s</p>
                    <p><span className={styles.statTitle}>visitors this month:</span> 12,345</p>
                    <p><span className={styles.statTitle}>visitors this week:</span> 1,234</p>
                    <p><span className={styles.statTitle}>visitors today:</span> 123</p>
                    <p><span className={styles.statTitle}>visitors this hour:</span> 12</p>
                    <p><span className={styles.statTitle}>visitors this minute:</span> 1</p>
                    <p><span className={styles.statTitle}>most active day:</span> tuesday</p>
                    <p><span className={styles.statTitle}>countries visited by:</span> usa, japan, korean, brazil</p>
                  </div>
                </div>
              </Window>
            </div>
                        
            <div className={styles.span2}>
              <Window>
                <div 
                  className={styles.glassCatContainer}
                  onMouseEnter={() => incrementCatState(4)}>
                  <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 4 ? styles.glassCatActive : ""}`}/>
                </div>
              </Window>
            </div>

            {/* Footer nav */}
            <div className={styles.spanFull}>
              <Window>
                <div className={styles.windowContent}>
                  <div className={styles.footerContainer}>
                    <p>made with ♡ copyright 2025 kirakissu</p>
                    <p>best viewed in desktop mode • 1920x1080</p>
                    <p>last updated: january 2024</p>
                    <p>questions? feedback? contact me @ <a href="mailto:admin@kirakissu.com">admin@kirakissu.com</a></p>
                  </div>
                </div>
              </Window>
            </div>
          </div>
        </div>

        {/* Right rail: Calendar / Mood */}
        <div className={styles.stickyRight}>
          <Window header="quick links">
            <div className={styles.windowContent}>
              <div className={styles.verticalNav}>
                <Button text="Home" onClick={() => scrollToId("aboutme")} />
                <Button text="About Me" onClick={() => scrollToId("aboutme")} />
                <Button text="Blog" onClick={() => scrollToId("blog")} />
                <Button text="Diary" onClick={() => scrollToId("quiz")} />
                <Button text="Scrapbook" onClick={() => scrollToId("gallery")} />
                <Button text="Guestbook" onClick={() => scrollToId("guestbook")} /> 
              </div>
            </div>
          </Window>
          <Window header="calendar" showButtons={true}>
            <div className={styles.windowContent}>
              <Calendar />
            </div>
          </Window>
        </div>
      </div>}
    </>
  );
}
