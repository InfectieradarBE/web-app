import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import DialogBtn from '../../buttons/DialogBtn';
import MarkdownRenderer from '../../displays/MarkdownRenderer';
import Dialog from '../Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery';

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
  const fullScreen = useMediaQuery('(max-width:600px)');

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
            style={{
              maxHeight: fullScreen ? 3000 : '60vh',
            }}
          >
            <MarkdownRenderer
              markdown={props.content} />
          </div>
          <div className="container-fluid">
            <div className={clsx(
              "bg-grey-1",
              "px-3 pt-2 pb-4 pb-sm-3",
              "row"
              // styles.btns
            )}>
              <div className="col-12 col-sm-6">
                <DialogBtn
                  className="w-100"
                  color="primary"
                  onClick={props.onConfirmed}
                  label={props.acceptBtn}
                  disabled={!scrollComplete}
                />

              </div>
              <div className="col-12 col-sm-6">
                <DialogBtn
                  className="w-100 my-2 my-sm-0"
                  color="primary"
                  outlined={true}
                  onClick={props.onCancelled}
                  label={props.cancelBtn}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
        : null}
    </Dialog>
  );
};

export default ConsentDialog;
