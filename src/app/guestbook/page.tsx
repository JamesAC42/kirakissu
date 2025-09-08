"use client";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function Guestbook() {
    return (
        <PageWrapper>
            <HeaderBox header="Guestbook" subtitle2="Leave a sweet note!" showFlashy={false}/>
        </PageWrapper>
    )
}