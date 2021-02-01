import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface DropdownItemProps {
  title: string;
  itemkey: string;
  iconClass?: string;
  url: string;
  onNavigate: (url: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { t } = useTranslation(['navbar']);
  return (
    <button className="dropdown-item text-center" type="button" >
      {props.iconClass ?
        <i className={clsx(props.iconClass, 'me-1')}></i>
        : null}
      {t(`${props.title}`)}
    </button>
  )
}
export default DropdownItem;
