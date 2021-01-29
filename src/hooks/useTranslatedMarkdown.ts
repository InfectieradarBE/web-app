import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useTranslatedMarkdown = (markdownPath: string) => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState<undefined | string>();

  useEffect(() => {
    const url = `${process.env.REACT_APP_CONTENT_URL}/locales/${i18n.language}/${markdownPath}`;
    fetch(url)
      .then(res => res.text())
      .then(text => {
        if (text.startsWith('<!DOCTYPE html>')) {
          console.log(`cannot find content for ${markdownPath}`);
          return;
        }
        setContent(text)
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return content;
}
