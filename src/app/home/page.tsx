'use client'
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Headerz from "@/components/Header";
import Landing from "@/components/Landing";

import React from 'react'

const page = () => {
    return (
        <>
            <Headerz />
            <Landing />
            <Features/>
            <Footer/>
        </>
    )
}

export default page
