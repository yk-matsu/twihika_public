import {useState} from 'react';

export const State = () => {
  const [sample, setSample] = useState<string[]>([]);
  const onClickUpdateSample = (item: string) => {
    setSample([...sample, item]);
  };
  return (
    <>
      <div style={{"border": "1px solid red", "display": "block"}}>{sample}</div>
      <Props sample={sample} onClick={onClickUpdateSample}></Props>
    </>
  );
};

export const Props = (props: {sample: any[]; onClick: (item: string) => void}) => {
  return (
    <div style={{"border": "1px solid blue", "display": "block"}}>
      {props.sample}
      <button
      style={{"display": "block"}}
        onClick={() => {
          props.onClick(Math.random().toString());
        }}
      >
        on Click add string
      </button>
    </div>
  );
};

