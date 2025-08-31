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

import daisuki from "@/assets/images/homepage/daisukiclear.png";

import Image from "next/image";
import bowbackground from "@/assets/images/backgrounds/bows.jpg";

import tommyairline from "@/assets/images/homepage/tommyairline.jpg";
import { Calendar } from "@/components/Calendar/Calendar";

import yawnprofile from "@/assets/images/homepage/yawn.png";
import glasscat from "@/assets/images/homepage/glasscat.png";
import { GalleryPreview } from "@/components/GalleryPreview/GalleryPreview";
import { MediaPlayer } from "@/components/MediaPlayer/MediaPlayer";
import Anilist from "@/components/Anilist/Anilist";
import Quiz from "@/components/Quiz/Quiz";
import Survey from "@/components/Survey/Survey";
import Guestbook from "@/components/Guestbook/Guestbook";

import strawberry from "@/assets/images/homepage/_strawberry.png";
import checkbox from "@/assets/images/homepage/_checkbox.png";

import tiktok from "@/assets/images/social media/tiktok.png";
import instagram from "@/assets/images/social media/instagram.png";
import xlogo from "@/assets/images/social media/x.png";
import pinterest from "@/assets/images/social media/pinterest.png";
import email from "@/assets/images/social media/email.png";

import japanflag from "@/assets/images/flags/japan.png";
import koreaflag from "@/assets/images/flags/korea.png";
import usaflag from "@/assets/images/flags/usa.png";

import sheep from "@/assets/images/homepage/sheep.gif";
import sailormoonstamp from "@/assets/images/stamps/sailormoon.png";

import lollipop from "@/assets/images/homepage/lollipop.png";
import kissu from "@/assets/images/homepage/kissu.png";
import sakura from "@/assets/images/sakura.png";
import icecream from "@/assets/images/homepage/icecream.png";
import hellokittydonut from "@/assets/images/homepage/hellokittydonut.png";

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
                  <Image src={yawnprofile} alt="profile" className={styles.profileImage} />
              </div>
              <p className={styles.hi}>Hi! I'm Yuè ♡<br/> ギャル好きの開発者</p>
              <p>Welcome to my digital diary!</p>
              <p>I'd like to share my thoughts and adventures with you!</p>
              <p>Languages: English, Japanese, Korean</p>
              <p className={styles.flags}>
                <Image src={japanflag} alt="japan" width={40} height={40} />
                <Image src={koreaflag} alt="korea" width={40} height={40} />
                <Image src={usaflag} alt="usa" width={40} height={40} />
              </p>
            </div>
          </Window>
          <Window header="status" showButtons={true}>
            <div className={styles.windowContent}>
              <p><span className={styles.bold}>mood:</span> ✨ きらきら ✨</p>
              <p><span className={styles.bold}>watching:</span> セーラームーン</p>
              <p><span className={styles.bold}>playing:</span> osu!</p>
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

                        <div className={styles.socialMediaContainer}>
                          <Button small={true} onClick={() => window.open("https://www.tiktok.com/@kirakissu", "_blank")}>
                            <Image src={tiktok} alt="tiktok" width={20} height={20} />
                          </Button>
                          <Button small={true} onClick={() => window.open("https://www.instagram.com/kirakissu", "_blank")}>
                            <Image src={instagram} alt="instagram" width={20} height={20} />
                          </Button>
                          <Button small={true} onClick={() => window.open("https://www.x.com/kirakissu", "_blank")}>
                            <Image src={xlogo} alt="x" width={20} height={20} />
                          </Button>
                          <Button small={true} onClick={() => window.open("https://www.pinterest.com/kirakissu", "_blank")}>
                            <Image src={pinterest} alt="pinterest" width={20} height={20} />
                          </Button>
                          <Button small={true} onClick={() => window.open("mailto:admin@kirakissu.com", "_blank")}>
                            <Image src={email} alt="email" width={20} height={20} />
                          </Button>
                        </div>
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
                  <div className={styles.diaryEntry}>
                    <h3>2025-01-01「はじめまして」</h3>
                    <p>New year, new vibes ♡ Finally launched my little corner of the web after weeks of coding! Currently sipping strawberry milk and adding the finishing touches. I have so many ideas for future posts about fashion, music, and my daily life in Tokyo. Hope you'll join me on this journey!</p>
                    <div className={styles.diaryButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>

                    <div className={styles.diaryStickerContainer}>
                      <StickerContainer blogId="2025-01-01" />
                    </div>
                  </div>
                  <div className={styles.diaryEntry}>
                    <h3>2024-12-24「クリスマスイブ」</h3>
                    <p>Spent Christmas Eve at the Harajuku illuminations with friends! The streets were so magical with all the twinkling lights. Picked up some adorable accessories at KIDDY LAND and had the most delicious strawberry crepe at my favorite cafe. Perfect end to 2024 ✧˖°</p>
                    <div className={styles.diaryButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>

                    <div className={styles.diaryStickerContainer}>
                      <StickerContainer blogId="2024-12-24" />
                    </div>
                  </div>
                  <div className={styles.diaryEntry}>
                    <h3>2024-12-20「新しいカメラ」</h3>
                    <p>Got my hands on a pastel pink instax mini! Can't wait to fill my scrapbook with dreamy polaroids. Testing it out today at the cat cafe with Mai-chan. The lighting is perfect and the cats are being extra photogenic ฅ^•ﻌ•^ฅ</p>
                    <div className={styles.diaryButtonContainer}>
                      <Button text="Read more" onClick={() => scrollToId("blog")} />
                    </div>
                    <div className={styles.diaryStickerContainer}>
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
              <Image src={hellokittydonut} alt="hellokittydonut" height={364} width={370} className={styles.paneImage} />
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
                    <li>🎵 <strong>song:</strong> ピーチソーダ</li>
                    <li>💄 <strong>makeup:</strong> glitter liner</li>
                    <li>✨ <strong>skincare:</strong> jelly mask</li>
                    <li>🍓 <strong>snack:</strong> strawberry pocky</li>
                    <li>🥤 <strong>drink:</strong> bubble tea</li>
                    <li>🎀 <strong>accessory:</strong> hair bows</li>
                    <li>💗 <strong>color:</strong> pastel pink</li>
                    <li>🌸 <strong>season:</strong> spring</li>
                  </ul>
                </div>
              </Window>
            </div>

            {/* Poll */}
            <div className={styles.span4}>
              <Window header="poll" showButtons={true}>
                <div className={`${styles.windowContent} ${styles.pollFormContainer}`}>
                  <p>who is your favorite sanrio character? サンリオは誰が好き？</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert("ありがとう ♡"); }}>
                    <div className={styles.pollForm}>
                      <label><input type="radio" name="sanrio" /> my melody</label>
                      <label><input type="radio" name="sanrio" /> kuromi</label>
                      <label><input type="radio" name="sanrio" /> cinnamoroll</label>
                      <label><input type="radio" name="sanrio" /> hello kitty</label>
                      <label><input type="radio" name="sanrio" /> pompompurin</label>
                      <label><input type="radio" name="sanrio" /> keroppi</label>
                      <label><input type="radio" name="sanrio" /> pochacco</label>
                      <label><input type="radio" name="sanrio" /> little twin stars</label>
                      <label><input type="radio" name="sanrio" /> charmy kitty</label>
                      <label><input type="radio" name="sanrio" /> badtz maru</label>
                      <label><input type="radio" name="sanrio" /> my sweet piano</label>
                      <label><input type="radio" name="sanrio" /> big challenges</label>
                    </div>
                    <div className={styles.pollButtonContainer}>
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
              <Image src={icecream} alt="icecream" height={315} width={432} className={styles.paneImage} />
            </div>
            
            {/* To-do */}
            <div id="todo" className={styles.span4}>
              <Window header="to-do" showButtons={true}>
                <div className={styles.windowContent}>
                  <div className={styles.toDoList}>
                    <ul>
                      <li className={styles.completed}><Image src={strawberry} alt="strawberry" width={20} height={20} /> finish portfolio redesign</li>
                      <li><Image src={checkbox} alt="checkbox" width={20} height={20} /> update blog with tokyo photos</li>
                      <li><Image src={checkbox} alt="checkbox" width={20} height={20} /> organize skincare routine</li>
                      <li className={styles.completed}><Image src={strawberry} alt="strawberry" width={20} height={20} /> buy new macaron flavors</li>
                      <li className={styles.completed}><Image src={strawberry} alt="strawberry" width={20} height={20} /> watch sailor moon episode</li>
                      <li><Image src={checkbox} alt="checkbox" width={20} height={20} /> practice japanese kanji</li>
                      <li className={styles.completed}><Image src={strawberry} alt="strawberry" width={20} height={20} /> find new kawaii accessories</li>
                      <li className={styles.completed}><Image src={strawberry} alt="strawberry" width={20} height={20} /> plan next purikura session</li>
                      <li><Image src={checkbox} alt="checkbox" width={20} height={20} /> update music playlist</li>
                    </ul>
                  </div>
                </div>
              </Window>
            </div>

            {/* blog posts   */}
            <div id="blogpost" className={styles.span8}>
              <Window header="blog posts" showButtons={true}>
                <div className={`${styles.windowContent} ${styles.blogPostContainer} scrollArea`}>
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
                      <div className={styles.blogItem}>
                        <h3>Hello World! <span className={styles.blogTags}><span className={styles.blogTag}>life</span><span className={styles.blogTag}>personal</span></span></h3>
                        <div className={styles.blogDate}>2025-01-01</div>
                        <p>New year, new vibes ♡ Finally launched my little corner of the web after weeks of coding!</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Year-End Prep <span className={styles.blogTags}><span className={styles.blogTag}>lifestyle</span><span className={styles.blogTag}>beauty</span></span></h3>
                        <div className={styles.blogDate}>2024-12-28</div>
                        <p>Getting ready for the new year with skincare prep and organizing my gyaru coord collection</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Christmas Coord <span className={styles.blogTags}><span className={styles.blogTag}>fashion</span><span className={styles.blogTag}>gyaru</span></span></h3>
                        <div className={styles.blogDate}>2024-12-25</div>
                        <p>Christmas outfit diary featuring pink and white coords with my favorite platform boots</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Test Title in English <span className={styles.blogTags}><span className={styles.blogTag}>random</span><span className={styles.blogTag}>test</span></span></h3>
                        <div className={styles.blogDate}>2024-12-25</div>
                        <p>Christmas outfit diary featuring pink and white coords with my favorite platform boots</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Winter Style <span className={styles.blogTags}><span className={styles.blogTag}>fashion</span><span className={styles.blogTag}>winter</span></span></h3>
                        <div className={styles.blogDate}>2024-12-25</div>
                        <p>Christmas outfit diary featuring pink and white coords with my favorite platform boots</p>
                      </div>
                    </div>
                    <div className={styles.blogSection}>
                      <div className={styles.blogCategoryTitle}>
                        <h2>popular posts</h2>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Beginner Gyaru Makeup <span className={styles.blogTags}><span className={styles.blogTag}>beauty</span><span className={styles.blogTag}>tutorial</span></span></h3>
                        <div className={styles.blogDate}>2024-11-15</div>
                        <p>Complete beginner's guide to gyaru makeup with affordable product recommendations</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Tokyo Cafe Hopping <span className={styles.blogTags}><span className={styles.blogTag}>travel</span><span className={styles.blogTag}>food</span></span></h3>
                        <div className={styles.blogDate}>2024-10-03</div>
                        <p>Aesthetic cafe hopping in Harajuku and Shibuya with kawaii dessert reviews</p>
                      </div>
                      <div className={styles.blogItem}>
                        <h3>Purikura Photo Tips <span className={styles.blogTags}><span className={styles.blogTag}>photography</span><span className={styles.blogTag}>fun</span></span></h3>
                        <div className={styles.blogDate}>2024-09-20</div>
                        <p>Tips and tricks for taking the perfect purikura photos with friends</p>
                      </div>
                    </div>
                  </div>
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
              <Image src={lollipop} alt="lollipop" height={260} width={420} className={styles.paneImage} />
            </div>

            {/* Quiz / Survey */}
            <div id="quiz" className={styles.span5}>
              <Window header="quiz / survey" showButtons={true}>
                <div className={styles.windowContent}>
                  <Quiz />
                  <div style={{ height: "1rem" }} />
                  <Survey />
                </div>
              </Window>
            </div>

            {/* Guestbook */}
            <div id="guestbook" className={styles.span5}>
              <Window header="guestbook" showButtons={true}>
                <div className={styles.windowContent}>
                  <Guestbook />
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
              
              <Image src={kissu} alt="kissu" height={566} width={440} className={styles.paneImage} />
              
            </div>

            {/* Footer nav */}
            <div className={styles.spanFull}>
              <Window>
                <div className={`${styles.windowContent} ${styles.footerOuter}`}>
                  <div className={styles.footerContainer}>
                    <p>made with ♡ copyright 2025 kirakissu</p>
                    <p>best viewed in desktop mode • 1920x1080</p>
                    <p>last updated: august 2025</p>
                    <p>questions? feedback? contact me @ <a href="mailto:admin@kirakissu.com">admin@kirakissu.com</a></p>
                    <div className={styles.footerImageLeft}>
                      <Image src={sakura} alt="sakura" className={styles.paneImage} />
                    </div>
                    <div className={styles.footerImageRight}>
                      <Image src={sakura} alt="sakura" className={styles.paneImage} />
                    </div>
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
