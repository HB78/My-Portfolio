"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "../styles";
import { navLinks } from "../constants";
import Image from "next/image";
import { logo, menu, close } from "../assets";
import logoh from "../assets/logoh.png"

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)

  return (
    <nav className={`${styles.paddingX} w-full flex flex-center py-5 fixed top-0 z-20`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto bg-primary">
        <Link
          aria-label="au clic un retour se fait au header"
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("")
            window.scrollTo(0.0)
          }}>
          <Image src={logoh} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Hicham<span className="sm:block hidden">&nbsp;| My Portfolio</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10" role="navigation">
          {navLinks.map((link) => {
            return (
              <li
                key={link.id}
                className={`${active === link.title ? "text-white" : "text-secondary"}
                hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => { setActive(link.title) }}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            )
          })}
        </ul>
        {/* //ici ce sera le menu nav pour le mode mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <Image src={toggle ? close : menu} alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => { setToggle(!toggle) }}
          />
          {/* //une div qui va contenir le menu */}
          <div className={`${!toggle ? "hidden" : 'flex'} p-6 absolute top-20 right-10
         mx-4 my-2 min-w-min[140px] z-10 rounded-xl bg-black`}>
            <ul className="list-none flex justify-end items-start flex-col gap-4" role="navigation">
              {navLinks.map((link) => {
                return (
                  <li
                    key={link.id}
                    className={`${active === link.title ? "text-white" : "text-secondary"}
                font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      //pour fermé automatiquement le menu quand on navigue entr les liens 
                      setToggle(!toggle)
                      setActive(link.title)
                    }}>
                    <Link href={`#${link.id}`}>
                      {link.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
