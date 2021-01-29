import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import DialogBtn from '../../buttons/DialogBtn';
import MarkdownRenderer from '../../displays/MarkdownRenderer';
import Dialog from '../Dialog';

interface ConsentDialogProps {
  open: boolean;
  title: string;
  content?: string;
  cancelBtn: string;
  acceptBtn: string;
  onConfirmed: () => void;
  onCancelled: () => void;
}

const ConsentDialog: React.FC<ConsentDialogProps> = (props) => {
  const [scrollComplete, setScrollComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current && containerRef.current.scrollHeight - containerRef.current.scrollTop - containerRef.current.clientHeight < 5) {
      setScrollComplete(true);
    }
  };

  useEffect(() => {
    if (props.open) {
      setTimeout(() => handleScroll(), 1500);
      setTimeout(() => handleScroll(), 3500);
    }
  }, [props.open])

  return (
    <Dialog
      open={props.open}
      onClose={props.onCancelled}
      title={props.title}
      ariaLabelledBy="contentDialogTitle"
    >
      {props.content ?
        <React.Fragment>
          <div
            className={clsx(
              // styles.content,
              "pb-2 px-3 pt-3 bg-white overflow-auto")}
            ref={containerRef}
            onScroll={() => handleScroll()}
          >
            <MarkdownRenderer
              markdown={props.content} />
          </div>
          <div className={clsx(
            "bg-secondary",
            "px-3 pt-2 pb-3 d-flex flex-column flex-sm-row",
            // styles.btns
          )}>

            <DialogBtn
              className="nowrap flex-grow-1 "
              color="primary"
              outlined={true}
              onClick={props.onCancelled}
              label={props.cancelBtn}
            />

            <DialogBtn
              className="nowrap w-100 flex-grow-1 mt-2 mt-sm-0 ms-sm-2"
              color="primary"
              onClick={props.onConfirmed}
              label={props.acceptBtn}
              disabled={!scrollComplete}
            />

          </div>
        </React.Fragment>
        : null}
    </Dialog>
  );
};

export default ConsentDialog;
