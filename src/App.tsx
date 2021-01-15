import React, { useEffect, useState } from 'react';

import Footer from './components/footer/Footer';
import { FooterContentConfig } from './types/config/footerContent';

import { useHistory } from 'react-router';

function App() {
  const history = useHistory();
  const [footerContent, setFooterContent] = useState<FooterContentConfig | undefined>();


  useEffect(() => {
    fetch('/example-content/configs/footer.json')
      .then(res => res.json())
      .then(value => setFooterContent(value))
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <div>header</div>
      <div>body
        <i className="material-icons">face</i>

      </div>
      <Footer
        loading={footerContent === undefined}
        content={footerContent}
        onChangeLanguage={(code) => console.log(code)}
        onNavigate={(url, external) => {
          if (external) {
            window.open(url, "_blank")
          } else {
            history.push(url);
          }
        }}
      />
    </div>
  );
}

export default App;
