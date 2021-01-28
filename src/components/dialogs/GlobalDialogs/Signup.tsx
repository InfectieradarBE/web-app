import React from 'react';
import Dialog from '../Dialog';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store/rootReducer';
import { closeDialog, openDialogWithoutPayload } from '../../../store/dialogSlice';
import clsx from 'clsx';
import { dialogPaddingXClass } from '../contants';


interface SignupProps {
}

const Signup: React.FC<SignupProps> = (props) => {
  const dialogState = useSelector((state: RootState) => state.dialog)
  const open = dialogState.config?.type === 'signup';

  const dispatch = useDispatch();


  const handleClose = () => {
    dispatch(closeDialog())
  }

  return (
    <Dialog
      open={open}
      title={'TODO: Signup'}
      onClose={handleClose}
      ariaLabelledBy="signupDialogTitle"
    >
      <div className={clsx(
        dialogPaddingXClass,
        'py-3'
      )}>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur exercitationem laudantium, quia placeat necessitatibus amet libero nemo facere. Amet laudantium perspiciatis saepe rerum pariatur voluptates consequatur totam libero quam magnam.</p>
        <button onClick={() => dispatch(openDialogWithoutPayload('login'))}>Go to login</button>
      </div>
    </Dialog>
  );
};

export default Signup;
