import React from 'react';
import { browserName, fullBrowserVersion } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useIsAuthenticated } from '../../hooks/useIsAuthenticated';

interface SystemInfoProps {
  itemKey: string;
  showBrowserInfo: boolean;
}

const SystemInfo: React.FC<SystemInfoProps> = (props) => {
  const { t } = useTranslation(['settings']);
  const isAuth = useIsAuthenticated();

  return (
    <div className="border-primary border-top-2 pt-2 mt-3">
      <h2 className="mb-2">
        {t(`${props.itemKey}.title`)}
      </h2>
      <p>
        <span className="text-grey-7">
          {t(`${props.itemKey}.appNameLabel`) + ': '}
        </span>
        {t(`${props.itemKey}.appName`)}
      </p>
      <p>
        <span className="text-grey-7">
          {t(`${props.itemKey}.versionLabel`) + ': '}
        </span>
        {process.env.REACT_APP_VERSION}
        {isAuth ? '*' : ''}
      </p>
      {props.showBrowserInfo ?
        <React.Fragment>
          <p>
            <span className="text-grey-7">
              {t(`${props.itemKey}.browserNameLabel`) + ': '}
            </span>
            {browserName}</p>
          <p>
            <span className="text-grey-7">
              {t(`${props.itemKey}.browserVersionLabel`) + ': '}
            </span>
            {fullBrowserVersion}
          </p>
        </React.Fragment>
        : null}
    </div>
  );
};

export default SystemInfo;
