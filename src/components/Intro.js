import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Intro = () => {
  const typeTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        '<h1>This is my City</h1>',
        '<h1>This is my Weather</h1>',
        '<h1>This is my Sound</h1>',
        '<h1>WeatherTape</h1>',
      ],
      typeSpeed: 100,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={typeTarget} />;
};
export default Intro;
