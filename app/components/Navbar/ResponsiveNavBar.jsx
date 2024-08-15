import React, { useState } from "react";
import logo from "../../images/diseño/logo peq sin texto.svg";
import hamburguesa from "../../images/diseño/hamburguesa.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ResponsiveNavbar = () => {
  const [t] = useTranslation("global");
  const links = [
    { to: "/", nombre: t("navBar.portada") },
    { to: "/gallery/All", nombre: t("navBar.galeria") },
    { to: "/signUp", nombre: t("navBar.apuntate") },
    { to: "/aboutMe", nombre: t("navBar.sobreMi") },
    { to: "https://musadeacuarela.vhx.tv/", nombre: t("navBar.clases"),target:'_blank' },
    { to: "/blog", nombre: 'Blog' },
    { to: "/contact", nombre: t("navBar.contacto") },
  ];
  const [collapse, setCollapse] = useState();

  const chanageBrand = () => {
    if (window.scrollY && window.innerWidth >= 768) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  };
  window.addEventListener("scroll", chanageBrand);

  return (
    <div>
      <div className="container-fluid d-flex align-items-center d-md-none py-3 sticky-top">
        <div
          className="position-absolute"
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          <img
            src={hamburguesa}
            alt={hamburguesa}
            width={45}
            className="ps-2"
          />
        </div>
        <Link to={"/"} className="m-auto">
          <img src={logo} alt="logo" width={45} />
        </Link>
      </div>
      <ul
        onClick={() => {
          setCollapse(!collapse);
        }}
        className={
          collapse ? ` modall  d-md-none ` : ` modall d-none d-md-none`
        }
      >
        {links.map((link) => {
          return (
            <li key={link.nombre} className="pb-2">
              {link.target !== "_blank" ? (
                <Link to={link.to} className="nav-link">
                  {link.nombre}
                </Link>
              ) : (
                <a
                  href={link.to}
                  target={"_blank"}
                  rel="noreferrer"
                  className="nav-link"
                >
                  {t("navBar.clases")}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResponsiveNavbar;
