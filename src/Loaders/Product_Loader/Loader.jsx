import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;

  .svg-frame {
    width: 200px;
    height: 200px;
  }

  svg {
    width: 100%;
    height: 100%;
    stroke: cyan;
    fill: transparent;
    animation: rotate 4s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader = () => {
    return (
        <StyledWrapper>
            <div className="svg-frame">
                <svg viewBox="0 0 344 344">
                    <circle cx="172" cy="172" r="100" strokeWidth="4" />
                    <circle cx="172" cy="172" r="25" strokeWidth="4" />
                </svg>
            </div>
        </StyledWrapper>
    );
};

export default Loader;
