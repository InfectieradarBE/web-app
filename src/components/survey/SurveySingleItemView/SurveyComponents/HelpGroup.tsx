import React from 'react';
import { ItemGroupComponent } from 'survey-engine/lib/data_types';

import TextViewComponent from './TextViewComponent';

interface HelpGroupProps {
  componentGroup: ItemGroupComponent;
  languageCode: string;
}

const HelpGroup: React.FC<HelpGroupProps> = (props) => {
  return (
    <div className="d-flex align-items-center ms-1">
      <button
        type="button"
        className="btn btn-link p-0 text-decoration-none" // p-0 text-center justify-content-center rounded-circle border-2 border-primary d-flex align-items-center text-decoration-none "
        aria-label={"Open Infos"}
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"

      >
        <span className="material-icons d-flex align-items-center" style={{ fontSize: '1.5rem' }}>help_outline</span>
      </button>
      <div
        id={'info-dropdown'}
        aria-label={'Info Box'}
        className="dropdown-menu dropdown-menu-end shadow border-none px-2 px-sm-3 py-2a w-75"
        style={{ maxWidth: 500, border: 'none' }}
      >
        {
          props.componentGroup.items.map((item, index) => {
            return <TextViewComponent key={index.toFixed()}
              compDef={item}
              languageCode={props.languageCode}
            />
          })
        }
      </div>
    </div>
  );
};

export default HelpGroup;
