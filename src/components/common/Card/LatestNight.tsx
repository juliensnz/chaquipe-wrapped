import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  height: 300px;
  display: flex;
  align-items: center;
`;

const Data = styled.div`
  font-size: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SurTitle = styled.div`
  font-size: 15px;
  opacity: 0.7;
`;

const Figure = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const Day = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Punch = styled.div`
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
            <Figure>{date.slice(0, 5)}</Figure>
          </div>
          <div>
            <SurTitle>You left at</SurTitle>
            <Figure>{new Date(leftAt).toLocaleTimeString().slice(0, 4)}</Figure>
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
