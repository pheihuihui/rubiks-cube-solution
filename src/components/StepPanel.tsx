import React from 'react';
import styled, { css } from 'styled-components'

// TODO: Make text move slightly on active state

const Content = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 6px;
  height: 34px;
  width: 100%;
  color: inherit;
  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  user-select: inherit;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f2f2f2;
  color: #464646;
  font-weight: 600;
  position: relative;
  padding: 0;
  border-radius: 6px;
  border: none;
  transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: -2px -6px 15px #fff, 2px 6px 15px rgba(0, 0, 0, 0.15);
  user-select: none;

  ${p =>
        p.theme === 'dark' &&
        css`
      background: #464646;
      color: #f2f2f2;
      box-shadow: -2px -6px 15px #555, 2px 6px 15px #232323;
    `}

  &:after, &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    z-index: 2;
    transition: all 200ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:before {
    background-color: transparent;
  }

  &:hover {
    cursor: pointer;

    &:before {
      background-color: ${p =>
        p.theme === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)'};
    }
  }

  &:focus {
    outline: none;
  }

  /* &:focus > ${Content} {
    border-color: rgba(50, 100, 200, 0.5);
  } */

  &:active {
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.02);
    &:after {
      box-shadow: inset -2px -2px 10px #fff,
        inset 2px 2px 10px rgba(0, 0, 0, 0.15);
    }
    &:before {
      background-color: transparent;
    }

    ${p =>
        p.theme === 'dark' &&
        css`
        &:after {
          box-shadow: inset -2px -2px 10px #555, inset 2px 2px 10px #232323;
        }
      `}
  }
`;

export const StepPanel = (props: { text: string }) => {
    return (
        <StyledButton theme='dark'>
            <Content>{props.text}</Content>
        </StyledButton>
    );
};
