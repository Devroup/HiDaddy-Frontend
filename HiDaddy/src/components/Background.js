import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// 배경 전체
const Container = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-color: ${colors.white};
`;

// Circle 컴포넌트
const Circle = styled.View`
  position: absolute;

  ${({ size = 100 }) => `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
  `}

  ${({ top }) => top !== undefined && `top: ${top}px;`}
  ${({ bottom }) => bottom !== undefined && `bottom: ${bottom}px;`}
  ${({ left }) => left !== undefined && `left: ${left}px;`}
  ${({ right }) => right !== undefined && `right: ${right}px;`}

  ${({ color }) => `background-color: ${color || 'white'};`}
  opacity: 1;
`;

//반응형
const getResponsiveCircles = () => {
  const baseCircleSize = Math.min(screenWidth, screenHeight) * 0.5;

  return [
    {
      size: baseCircleSize,
      top: screenHeight * 0.06,
      left: -baseCircleSize * 0.4,
    },
    {
      size: baseCircleSize,
      top: screenHeight * 0.4,
      right: -baseCircleSize * 0.14,
    },
    {
      size: baseCircleSize,
      bottom: -baseCircleSize * 0.4,
      left: -screenWidth * 0.1,
    },
  ];
};

export default function Background({
  circles = getResponsiveCircles(),
  circleColors = [colors.lightYellow, colors.lightBlue, colors.pink],
}) {
  return (
    <Container>
      {circles.map((cfg, i) => (
        <Circle
          key={i}
          size={cfg.size}
          top={cfg.top}
          bottom={cfg.bottom}
          left={cfg.left}
          right={cfg.right}
          color={circleColors[i % circleColors.length]}
        />
      ))}
    </Container>
  );
}
