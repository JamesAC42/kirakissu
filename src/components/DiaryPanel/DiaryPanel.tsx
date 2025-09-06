import { Button } from "../Button/Button"
import styles from "./diarypanel.module.scss"
import { StickerContainer } from "../StickerContainer/StickerContainer"
import { useRouter } from "next/navigation"
import { Window } from "../Window/Window"

export interface IDiaryPanelProps {
    entries: {
        date: string,
        preview: string,
        id: string
    }[]
}

export const DiaryPanel = (props: IDiaryPanelProps) => {
    const router = useRouter()

    return (
        <Window header="diary" showButtons={true} contentClass={`${styles.diaryWindow} scrollArea`}>
            <div className={'windowContent'}>
                {
                    props.entries.map((entry) => (
                        <div className={styles.diaryEntry} key={entry.id}>
                            <h3>{entry.date}</h3>
                            <p>{entry.preview}</p>
                            <div className={styles.diaryButtonContainer}>
                                <Button text="Read more" onClick={() => router.push(`/diary/${entry.id}`)} />
                            </div>
        
                            <div className={styles.diaryStickerContainer}>
                                <StickerContainer blogId={entry.id} />
                            </div>
                        </div>
                    ))
                }

                {
                    props.entries.length === 0 && (
                        <p className={styles.diaryEmpty}>No diary entries yet!</p>
                    )
                }
            </div>
        </Window>
    )
}