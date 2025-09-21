"use client";

import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import { ProfilePanel } from "@/components/ProfilePanel/ProfilePanel";
import { useRouter } from "next/navigation";

import { Welcome } from "@/components/Welcome/Welcome";
import { Window } from "@/components/Window/Window";
import { Button } from "@/components/Button/Button";

import Image from "next/image";

import tommyairline from "@/assets/images/homepage/tommyairline.jpg";
import { Calendar } from "@/components/Calendar/Calendar";

import glasscat from "@/assets/images/homepage/glasscat.png";
import Anilist from "@/components/Anilist/Anilist";
import Quiz, { IQuizProps } from "@/components/Quiz/Quiz";
import Survey, { ISurveyProps } from "@/components/Survey/Survey";
import Guestbook from "@/components/Guestbook/Guestbook";

import tiktok from "@/assets/images/social media/tiktok.png";
import instagram from "@/assets/images/social media/instagram.png";
import xlogo from "@/assets/images/social media/x.png";
import pinterest from "@/assets/images/social media/pinterest.png";
import email from "@/assets/images/social media/email.png";

import orbit from "@/assets/images/orbit.gif";
import { VerticalNav } from "@/components/VerticalNav/VerticalNav";
import Link from "next/link";

import lollipop from "@/assets/images/homepage/lollipop.png";
import kissu from "@/assets/images/homepage/kissu.png";
import sakura from "@/assets/images/sakura.png";
import icecream from "@/assets/images/homepage/icecream.png";
import hellokittydonut from "@/assets/images/homepage/hellokittydonut.png";

import { MediaPlayer } from "@/components/MediaPlayer/MediaPlayer";

import { IProfilePanelProps } from "@/components/ProfilePanel/ProfilePanel";
import { StatusPanel, IStatusPanelData } from "@/components/StatusPanel/StatusPanel";
import { DiaryPanel, IDiaryPanelProps } from "@/components/DiaryPanel/DiaryPanel";
import { FAQPanel, IFAQPanelProps } from "@/components/FAQPanel/FAQPanel";
import { GalleryPreview, IGalleryPreviewProps } from "@/components/GalleryPreview/GalleryPreview";
import { FavoritesPanel, IFavoritesPanelProps } from "@/components/FavoritesPanel/FavoritesPanel";
import { PollPanel, IPollPanelProps } from "@/components/PollPanel/PollPanel";
import { TodoPanel, ITodoPanelProps } from "@/components/TodoPanel/TodoPanel";
import { BlogPanel, IBlogPanelProps } from "@/components/BlogPanel/BlogPanel";
import { StatsPanel } from "@/components/StatsPanel/StatsPanel";
import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { BlinkiesRow } from "@/components/BlinkiesRow/BlinkiesRow";
import { Footer } from "@/components/Footer/Footer";

interface HomeState {
  profile: IProfilePanelProps;
  status: IStatusPanelData;
  diary: IDiaryPanelProps;
  faq: IFAQPanelProps;
  gallery: IGalleryPreviewProps;
  favorites: IFavoritesPanelProps;
  poll: IPollPanelProps;
  todo: ITodoPanelProps;
  blog: IBlogPanelProps;
  quiz: IQuizProps;
  survey: ISurveyProps;
  lastUpdated: string;
}

export default function Home() {

  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const router = useRouter();

  const [catState, setCatState] = useState(1);

  const [homeData, setHomeData] = useState<HomeState | null>(null);

  const incrementCatState = (id: number) => {
    if (catState === id) {
      setCatState(catState === 4 ? 1 : catState + 1);
    }
  }
  
  const onEnter = () => { 
    setHasSeenWelcome(false);
    localStorage.setItem("hasSeenWelcome", "true");
  }

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setHasSeenWelcome(true);
    } else {
      setHasSeenWelcome(false);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch("/api/homepage");
        if (!resp.ok) return;
        const data = await resp.json();
        setHomeData(data as HomeState);
      } catch {
        // ignore for now
      }
    };
    load();
  }, []);

  if (hasSeenWelcome === null || homeData === null) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingText}>
            <h1>Loading...</h1>
          </div>
        </div>
        <Window header="home_planet.gif">
          <div className={styles.loadingImage}>
            <Image src={orbit} alt="orbit" width={400} height={400} />
          </div>
        </Window>
      </div>
    )
  }

  return (
    <>
      {
      hasSeenWelcome ? 
      <Welcome onEnter={onEnter}/> 
      : 
      <div className={`pageContainer scrollArea`}>
        <div className={`stickyLeft`}>
          <Window header="about me" showButtons={true}>
            <ProfilePanel 
              headerText={homeData?.profile?.headerText} 
              subHeaderText={homeData?.profile?.subHeaderText} />
          </Window>
          <div className={styles.showSmall}>
            <VerticalNav />
          </div>
          <div className={styles.hideShort}>
            <Window header="status" showButtons={true}>
              <StatusPanel data={homeData?.status ?? {}} />
            </Window>
          </div>
        </div>

        <div className={styles.homeContainerInner}>
          <div id="top" />
          <div className={styles.windowsGrid}>
            <div className={`${styles.spanFull} ${styles.headerContainer}`}>
              
              <HeaderBox header="kirakissu" subtitle="いらっしゃいませ!!" subtitle2="Welcome to my pink corner of the web!" showFlashy={true}>
                <div className={styles.navButtons}>
                  <Link href="/blog">
                    <Button text="Blog" />
                  </Link>
                  <Link href="/aboutme">
                    <Button text="About Me" />
                  </Link>
                  <Link href="/diary">
                    <Button text="Diary" />
                  </Link>
                  <Link href="/scrapbook">
                    <Button text="Scrapbook" />
                  </Link>
                  <Link href="/guestbook">
                    <Button text="Guestbook" />
                  </Link>

                  <div className={styles.socialMediaContainer}>
                    <Button small={true} onClick={() => window.open("https://www.tiktok.com/@kirakissu", "_blank")}>
                      <Image src={tiktok} alt="tiktok" width={20} height={20} />
                    </Button>
                    <Button small={true} onClick={() => window.open("https://www.instagram.com/kirakissu.blog", "_blank")}>
                      <Image src={instagram} alt="instagram" width={20} height={20} />
                    </Button>
                    <Button small={true} onClick={() => window.open("https://www.x.com/kirakissublog", "_blank")}>
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
              </HeaderBox>
            </div>

            <div className={styles.spanFull}>
              <BlinkiesRow />
            </div>

            <div id="diary" className={styles.span8}>
              <DiaryPanel entries={homeData?.diary?.entries ?? []} />
            </div>

            <div id="music" className={styles.span4}>
              <Window header="music playlist" showButtons={true}>
                <div className={'windowContent'}>
                  <MediaPlayer />
                </div>
              </Window>
              <br/>
              <div className={styles.hideSmall}>
                <Window>
                  <div className={`windowContent ${styles.tommyAirline}`}>
                    <Image src={tommyairline} alt="tommyairline" width={248} height={247} />
                    <div className={styles.tommyAirlineText}>
                    私のお気に入りのアルバムです！
                    </div>
                  </div>
                </Window>
              </div>
            </div>

            <div id="faq" className={styles.spanFull}>
              <Window header="FAQ" showButtons={true}>
                <FAQPanel faqs={homeData?.faq?.faqs ?? []} />
              </Window>
            </div>

            <div className={styles.span2}>
              <div className={styles.hideSmall}>
                <Window>
                  <div 
                    className={styles.glassCatContainer}
                    onMouseEnter={() => incrementCatState(1)}>
                    <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 1 ? styles.glassCatActive : ""}`} />
                  </div>
                </Window>
              </div>
              <Image src={hellokittydonut} alt="hellokittydonut" height={364} width={370} className={styles.paneImage} />
            </div>

            <div id="gallery" className={styles.span10}>
              <Window header="photo gallery" showButtons={true}>
                <div className={`windowContent`}>
                  <GalleryPreview images={homeData?.gallery?.images ?? []} />
                </div>
              </Window>
            </div>

            <div id="favorites" className={styles.span6}>
              <Window header="my favorite things" showButtons={true}>
                <FavoritesPanel favorites={homeData?.favorites?.favorites ?? []} />
              </Window>
            </div>

            <div className={styles.span4}>
              <Window header="poll" showButtons={true}>
                <PollPanel poll={homeData?.poll?.poll ?? { question: "", options: [] }} />
              </Window>
            </div>

            <div className={styles.span2}>
              <div className={styles.hideSmall}>
                <Window>
                  <div 
                    className={styles.glassCatContainer}
                    onMouseEnter={() => incrementCatState(2)}>
                    <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 2 ? styles.glassCatActive : ""}`}/>
                  </div>
                </Window>
              </div>
              <Image src={icecream} alt="icecream" height={315} width={432} className={styles.paneImage} />
            </div>
            
            <div id="todo" className={styles.span4}>
              <Window header="to-do" showButtons={true}>
                <TodoPanel todos={homeData?.todo?.todos ?? []} />
              </Window>
            </div>

            <div id="blogpost" className={styles.span8}>
              <Window header="blog posts" showButtons={true}>
                <BlogPanel 
                  recentPosts={homeData?.blog?.recentPosts ?? []} 
                  popularPosts={homeData?.blog?.popularPosts ?? []} />
              </Window>
            </div>

            <div className={styles.span2}>
              <div className={styles.hideSmall}>
                <Window>
                  <div 
                    className={styles.glassCatContainer}
                    onMouseEnter={() => incrementCatState(3)}>
                    <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 3 ? styles.glassCatActive : ""}`}/>
                  </div>
                </Window>
              </div>
              <Image src={lollipop} alt="lollipop" height={260} width={420} className={styles.paneImage} />
            </div>

            <div id="quiz" className={styles.span5}>
              <Window header="quiz / survey" showButtons={true}>
                <div className={`windowContent`}>
                  <Quiz question={homeData?.quiz?.question ?? ""} options={homeData?.quiz?.options ?? []} correctAnswerId={homeData?.quiz?.correctAnswerId ?? ""} />
                  <div style={{ height: "1rem" }} />
                  <Survey question={homeData?.survey?.question ?? ""} choices={homeData?.survey?.choices ?? []} />
                </div>
              </Window>
            </div>

            <div id="guestbook" className={styles.span5}>
              <Window header="guestbook" showButtons={true}>
                <div className={`windowContent`}>
                  <Guestbook />
                </div>
              </Window>
            </div>

            <div id="anilist" className={styles.spanFull}>
              <Window header="anilist" showButtons={true}>
                <div className={`windowContent`}>
                  <Anilist user="yuckitsyue" />
                </div>
              </Window>
            </div>

            <div id="analytics" className={styles.span10}>
              <Window header="site stats" showButtons={true}>
                <StatsPanel />
              </Window>
            </div>
                        
            <div className={styles.span2}>
              <div className={styles.hideSmall}>
                <Window>
                  <div 
                    className={styles.glassCatContainer}
                    onMouseEnter={() => incrementCatState(4)}>
                    <Image src={glasscat} alt="glasscat" width={100} height={100} className={`${styles.glassCat} ${catState === 4 ? styles.glassCatActive : ""}`}/>
                  </div>
                </Window>
              </div>
              <Image src={kissu} alt="kissu" height={566} width={440} className={styles.paneImage} />
            </div>

            <div className={styles.spanFull}>
              <Footer lastUpdated={homeData?.lastUpdated ?? ""} />
            </div>
          </div>
        </div>

        <div className={`stickyRight ${styles.hideSmall}`}>
          <VerticalNav />
          <Window header="calendar" showButtons={true}>
            <div className={`windowContent`}>
              <Calendar />
            </div>
          </Window>
        </div>
      </div>}
    </>
  );
}
