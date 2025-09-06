"use client";

import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function Blog() {
    return (
        <PageWrapper header="blog" subHeader="blog">
            <Button text="Home" onClick={() => {}} />
        </PageWrapper>
    )
}