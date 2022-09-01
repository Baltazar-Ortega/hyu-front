import React from 'react'
import { SideBar } from './Sidebar'
import { Header } from "./Header/Header";
import { Footer } from './Footer/Footer';

export const Layout = ({children}) => {
    return (
        <div id="myapp" >
            <SideBar pageWrapId={"page-wrap"} outerContainerId={"myapp"} />
            <div id="page-wrap" style={{overflow: 'hidden'}}> 
                <Header />
                {children}
            </div>
            <Footer />
        </div>
    )
}
