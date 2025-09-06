import { ProfilePanel } from "../ProfilePanel/ProfilePanel"
import { VerticalNav } from "../VerticalNav/VerticalNav"
import { Window } from "../Window/Window"

export interface IPageWrapperProps {
    children: React.ReactNode
    header: string
    subHeader: string
}

export const PageWrapper = ({ children, header, subHeader }: IPageWrapperProps) => {
    return (
        <div className={`pageContainer scrollArea`}>
            <div className={`pageContent`}>
                <Window>
                    <h1>{header}</h1>
                    <p>{subHeader}</p>
                </Window>
                {children}
            </div>
            <div className={`stickyRight`}>
                <Window header="blog" showButtons={true}>
                    <ProfilePanel headerText="blog" subHeaderText="blog" />
                </Window>
                <VerticalNav />
            </div>
        </div>
    )
}