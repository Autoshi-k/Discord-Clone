import { useState } from 'react';
import { CustomPicker } from 'react-color';
import {EditableInput, Hue, Saturation } from 'react-color/lib/components/common';

export const MyColorPicker = ({ hex, hsl, hsv, onChange, currentColor }) => {
  const styles = {
    hue: {
      height: 10,
      position: "relative",
      marginBottom: 10
    },
    saturation: {
      width: '100%',
      height: '12rem',
      position: 'relative',
      marginBottom: '.5rem'
    },
    input: {
      height: 34,
      backgroundColor: '#303339',
      border: '1px solid #202225',
      paddingLeft: 10,
      borderRadius: '.1rem'
    }
  };
  return (
    <div className='color-picker'>

      <div style={styles.saturation}>
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>
      <div style={styles.hue}>
        <Hue hsl={hsl} onChange={onChange} />
      </div>

      <div style={{ display: "flex" }}>
        <EditableInput
          style={{ input: styles.input }}
          value={hex}
          onChange={onChange}
        />
        <div style={styles.swatch} />
      </div>
    </div>
  );
};

export default CustomPicker(MyColorPicker);