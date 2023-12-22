import {useMemo} from 'react';
import styled from 'styled-components';

// give the opposite color of the background
const getOpositeColor = (color: string) => {
  color = color.slice(1);

  var num = parseInt(color, 16);

  var r = (num >> 16) / 255;
  var g = ((num >> 8) & 0x00ff) / 255;
  var b = (num & 0x0000ff) / 255;

  return r * 0.299 + g * 0.587 + b * 0.114 > 0.5 ? '#000000' : '#ffffff';
};

const backgrounds = [
  {from: '#9890e3', to: '#b1f4cf'},
  {from: '#37ecba', to: '#72afd3'},
  {from: '#c471f5', to: '#fa71cd'},
  {from: '#feada6', to: '#f5efef'},
  {from: '#c1dfc4', to: '#deecdd'},
  {from: '#00c6fb', to: '#005bea'},
  {from: '#9795f0', to: '#fbc8d4'},
  {from: '#7028e4', to: '#e5b2ca'},
  {from: '#88d3ce', to: '#6e45e2'},
  {from: '#ff0844', to: '#ffb199'},
  {from: '#ff758c', to: '#ff7eb3'},
  {from: '#b721ff', to: '#21d4fd'},
  {from: '#abecd6', to: '#fbed96'},
  {from: '#ddd6f3', to: '#faaca8'},
  {from: '#f77062', to: '#fe5196'},
  {from: '#16a085', to: '#f4d03f'},
  {from: '#ff5858', to: '#f09819'},
  {from: '#00cdac', to: '#8ddad5'},
  {from: '#2b5876', to: '#4e4376'},
  {from: '#4481eb', to: '#04befe'},
];

const Container = styled.div<{from: string; to: string; isVisible: boolean}>`
  background-image: linear-gradient(to top, ${({from}) => from} 0%, ${({to}) => to} 100%);

  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({from, to}) => getOpositeColor(from)};
  display: ${({isVisible}) => (isVisible ? 'flex' : 'none')};
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: row;
`;

const PreviousButton = styled.div`
  flex: 3;
`;
const NextButton = styled.div`
  flex: 2;
`;

type CardProps = {
  onNext: () => void;
  onPrevious: () => void;
  isVisible: boolean;
  children: React.ReactNode;
};

const Card = ({children, isVisible, onPrevious, onNext}: CardProps) => {
  const {from, to} = useMemo(() => backgrounds[Math.floor(Math.random() * backgrounds.length)], []);

  return (
    <Container isVisible={isVisible} from={from} to={to}>
      {children}
      <Overlay>
        <PreviousButton onClick={onPrevious} />
        <NextButton onClick={onNext} />
      </Overlay>
    </Container>
  );
};

export {Card};
