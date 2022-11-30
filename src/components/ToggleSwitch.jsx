import React,{useState} from 'react'
import Switch from "react-switch";

const BasicHooksExample = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };

  return (
    <div className="text-right align-middle">
      <label>
        <span className='text-xl mb-5'>Habilitar </span>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
    </div>
  );
};

export default BasicHooksExample
/* styles.css */

