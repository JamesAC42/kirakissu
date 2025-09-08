"use client";

import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import HeaderBox from "@/components/HeaderBox/HeaderBox";

export default function Diary() {
    return (
        <PageWrapper>
            <HeaderBox header="Diary" subtitle2="A little bit about me and my journey." showFlashy={false}/>
        </PageWrapper>
    )
}