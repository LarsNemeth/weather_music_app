import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Intro = () => {
  const typeTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        '<h1>Your City</h1>',
        '<h1>The Weather</h1>',
        '<h1>Your Sound</h1>',
        '<h1>Weather Tape</h1>',
      ],
      typeSpeed: 100,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="font-style">
      <span ref={typeTarget} />
    </div>
  );
};
export default Intro;
