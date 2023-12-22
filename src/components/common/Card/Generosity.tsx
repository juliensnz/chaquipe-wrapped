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
  font-size: 25px;
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

const Generosity = ({offeredRounds, drinks, biggestRound}: UserStats['rounds']) => {
  return (
    <Container>
      <Title>{"... And it's always more fun together ! 👯‍♂️"}</Title>
      <Data>
        <Day>
          <div>
            <SurTitle>You gifted</SurTitle>
            <Figure>{offeredRounds} rounds</Figure>
          </div>
          <div>
            <SurTitle>The biggest was</SurTitle>
            <Figure>{biggestRound} drinks</Figure>
          </div>
        </Day>
        <Punch>
          In total, you gifted <Big>{drinks}</Big> drinks! Cheers!
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {Generosity};
