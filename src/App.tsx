import React, { useEffect, useState } from 'react';

import Footer from './components/footer/Footer';
import { FooterContentConfig } from './types/config/footerContent';

import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { HeaderConfig } from './types/config/header';
import { NavbarConfig } from './types/config/navbar';
import { PagesConfig } from './types/config/pages';
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from './components/pages/Pages';
import ScrollToTop from './components/misc/ScrollToTop';

import { useTranslation } from 'react-i18next';
import GlobalDialogs from './components/dialogs/GlobalDialogs';
import { handleOpenExternalPage } from './utils/routeUtils';
import { DialogConfig } from './types/config/dialogs';

function App() {
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig | undefined>();
  const [navbarConfig, setNavbarConfig] = useState<NavbarConfig | undefined>();
  const [pagesConfig, setPagesConfig] = useState<PagesConfig | undefined>();
  const [footerConfig, setFooterConfig] = useState<FooterContentConfig | undefined>();
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | undefined>();

  const { i18n } = useTranslation();

  useEffect(() => {
    // Header config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/header.json`)
      .then(res => res.json())
      .then(value => setHeaderConfig(value))
      .catch(error => console.log(error));

    // Navbar config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/navbar.json`)
      .then(res => res.json())
      .then(value => setNavbarConfig(value))
      .catch(error => console.log(error));

    // Pages config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/pages.json`)
      .then(res => res.json())
      .then(value => setPagesConfig(value))
      .catch(error => console.log(error));

    // Footer Config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/footer.json`)
      .then(res => res.json())
      .then(value => setFooterConfig(value))
      .catch(error => console.log(error));

    // Dialog Config
    fetch(`${process.env.REACT_APP_CONTENT_URL}/configs/dialogs.json`)
    .then(res => res.json())
    .then(value => setDialogConfig(value))
    .catch(error => console.log(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLanguageChange = (code: string) => {
    console.log(`Changing language to: ${code}`);
    i18n.changeLanguage(code);
  }

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : undefined}>
      <ScrollToTop />
      <Header
        config={headerConfig}
        onChangeLanguage={handleLanguageChange}
        onOpenExternalPage={handleOpenExternalPage}
      />
      <Navbar
        loading={navbarConfig === undefined}
        content={navbarConfig}
        onOpenExternalPage={handleOpenExternalPage}
      />
      <Pages
        config={pagesConfig}
        onOpenExternalPage={handleOpenExternalPage}
      />
      <Footer
        loading={footerConfig === undefined}
        content={footerConfig}
        onChangeLanguage={handleLanguageChange}
        onOpenExternalPage={handleOpenExternalPage}
      />
      <GlobalDialogs
        config={dialogConfig}
        onChangeLanguage={handleLanguageChange}
       />
    </Router>
  );
}

export default App;
