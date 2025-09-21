import styles from "./welcome.module.scss";
import Image from "next/image";
import wings from "@/assets/images/wing.png";
import sakura from "@/assets/images/sakura.png";
import girl from "@/assets/images/girl.png";

import angellover from "@/assets/images/blinkies/angellover.gif";
import pinkpink from "@/assets/images/blinkies/pinkpink.gif";
import gyarulover from "@/assets/images/blinkies/gyarulove.gif";
import whereami from "@/assets/images/blinkies/whereami.gif";

export const Welcome = ({ onEnter }: { onEnter: () => void }) => {

    return (
        <div className={`${styles.welcomeContainer} plaidBackground`}>
            <div className={styles.welcomeContent}>
                <div className={styles.welcomeContentInner}>
                    
                    <div className={styles.blinkies}>
                        <Image 
                            src={angellover} 
                            className={styles.blinkie} 
                            alt="angellover" 
                            width={150} 
                            height={20}
                        />
                        <Image 
                            src={pinkpink} 
                            className={styles.blinkie} 
                            alt="pinkpink" 
                            width={150} 
                            height={20}
                        />
                        <Image 
                            src={gyarulover} 
                            className={styles.blinkie} 
                            alt="gyarulover" 
                            width={150} 
                            height={20}
                        />
                        <Image 
                            src={whereami} 
                            className={styles.blinkie} 
                            alt="whereami" 
                            width={150} 
                            height={20}
                        />
                    </div>
                    <h1><span>w</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span> <span>t</span><span>o</span><br /><span>k</span><span>i</span><span>r</span><span>a</span><span>k</span><span>i</span><span>s</span><span>s</span><span>u</span><span>!</span>
                    <Image 
                        src={wings} 
                        className={styles.wingsLeft} 
                        alt="wings" 
                        width={500} 
                        height={500}
                    />
                    <Image 
                        src={wings} 
                        className={styles.wingsRight} 
                        alt="wings" 
                        width={500} 
                        height={500}
                    /></h1>

                    <p className={styles.welcomeText}>
                        Step inside and make yourself at home, princess~ this little corner of the internet is my dollhouse dreamland, made just for gyarus, living dolls, and all the modern-day princesses who want a touch of magic in everyday life.
                    </p>
                    <p className={styles.welcomeText}>
                        Here you’ll find a cozy mix of old internet nostalgia, D.I.Y. projects, girly media, dolly fashion inspo, and plenty of pink, frilly prettiness to brighten your day~ Whether you love crafting, dressing up, collecting cute things, or just escaping into a world of nostalgic romance, you’ll find a piece of your heart here.
                        </p>
                    <p className={styles.welcomeText}>
                        Think of this space as a little hideaway where you can be your most extra, glittery, and dolly self~
                    </p>
                    <p className={styles.welcomeText}>
                        XOXO,
                    </p>
                    <p className={styles.signature}>
                        KiraKissu
                    </p>
                    <button onClick={onEnter}>Enter Now</button>
                    <p className={styles.copyright}>
                        &copy; 2025 Kira Kissu. All rights reserved.
                    </p>


                    <Image 
                        src={sakura} 
                        className={styles.sakura} 
                        alt="sakura" 
                        width={736} 
                        height={736}
                    />
                    <Image 
                        src={girl} 
                        className={styles.girl} 
                        alt="girl" 
                        width={518} 
                        height={448}
                    />
                </div>
            </div>
        </div>
    )
}