/**@jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

function FullPageSpinner() {
  return (
    <div
      css={{
        marginTop: '3em',
        fontSize: '4em',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <FaSpinner
        css={{ animation: `${spin} 1s linear infinite` }}
        aria-label="loading"
      />
    </div>
  );
}
export { FullPageSpinner };
