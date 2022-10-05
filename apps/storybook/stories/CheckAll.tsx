import React from 'react';

interface CheckAllProps {}

/**
 * Primary UI component for user interaction
 */
export const CheckAll = ({...props}: CheckAllProps) => {
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" className="checkbox__main" />
        <span className="checkbod__label">選択肢1</span>
      </label>
      <div id="boxes">
        <label className="checkbox">
          <input type="checkbox" className="checkbox__main" />
          <span className="checkbod__label">選択肢1</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" className="checkbox__main" />
          <span className="checkbod__label">選択肢2</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" className="checkbox__main" />
          <span className="checkbod__label">選択肢3</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" className="checkbox__main" />
          <span className="checkbod__label">選択肢4</span>
        </label>
        <label className="checkbox">
          <input type="checkbox" className="checkbox__main" />
          <span className="checkbod__label">選択肢5</span>
        </label>
      </div>
    </>
  );
};
