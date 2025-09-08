"use client";

import styles from "./page.module.scss";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function AboutMe() {
    return (
        <PageWrapper>
            <HeaderBox header="About Me" subtitle2="A little bit about me and my journey." showFlashy={false}/>
        </PageWrapper>
    )
}