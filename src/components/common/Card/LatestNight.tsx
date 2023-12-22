import {Container, Data, Day, Figure, Punch, Title} from '@/components/common/Card/common';
import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';

const SurTitle = styled.div`
  font-size: 15px;
  opacity: 0.7;
`;

const Big = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const LatestNight = ({date, leftAt, totalTimeSpent}: UserStats['latestNight'] & {totalTimeSpent: number}) => {
  return (
    <Container>
      <Title>{"It's better when it lasts longer 🎉"}</Title>
      <Data>
        <Day>
          <div>
            <SurTitle>It was the</SurTitle>
            <Figure>{date.split('/').slice(0, 2).join('/')}</Figure>
          </div>
          <div>
            <SurTitle>You left at</SurTitle>
            <Figure>{new Date(leftAt).toLocaleTimeString().split(':').slice(0, 2).join(':')}</Figure>
          </div>
        </Day>
        <Punch>
          In total, you spent <Big>{Math.floor(totalTimeSpent / 1000 / 3600)} hours</Big> at the Chaquip!
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {LatestNight};
