import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  id?: string;
  step?: number;
  value: number;
  onChange: (value?: number) => void;
}

const Slider: React.FC<SliderProps> = (props) => {

  const renderTicks = () => {
    if (!props.step) {
      return null;
    }

    const numberOfTicks = Math.floor((props.max - props.min) / (props.step) + 1);

    return (
      <React.Fragment>
        {Array(numberOfTicks).fill(0).map(
          (_, index: number) => <span
            key={index.toString()}
            className="tick"
          ></span>)
        }
      </React.Fragment>
    )
  }

  return (
    <div className="position-relative">
      <input
        type="range"
        className="form-range"
        min={props.min}
        max={props.max}
        step={props.step}
        id={props.id}
        value={props.value}
        onChange={(event) => {
          const value = parseFloat(event.target.value);
          props.onChange(value)
        }}

      />
      <div className="pe-none ticks position-absolute left-0 right-0 top-0 h-100 d-flex w-100 justify-content-between">
        <div className="range-track"></div>
      </div>
      <div className="pe-none ticks position-absolute left-0 right-0 top-0 h-100 d-flex w-100 justify-content-between">
        {renderTicks()}
      </div>
    </div>
  );
};

export default Slider;
