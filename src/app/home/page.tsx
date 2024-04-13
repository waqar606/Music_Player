'use client'
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Headerz from "@/components/Header";
import Landing from "@/components/Landing";

import React, { useState } from 'react'

const page = () => {
    const [showSugg,setShowSugg] = useState(false)
    return (
        <>
            <Headerz />
            <Landing showSugg={showSugg} setShowSugg={setShowSugg}/>
            <Features setShowSugg={setShowSugg}/>
            <Footer/>
        </>
    )
}

export default page
