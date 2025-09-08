"use client";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function Scrapbook() {
    return (
        <PageWrapper>
            <HeaderBox header="Scrapbook" subtitle2="My scrapbook of memories." showFlashy={false}/>
        </PageWrapper>
    )
}