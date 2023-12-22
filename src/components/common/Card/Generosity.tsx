import {Container, Data, Day, Punch, Title} from '@/components/common/Card/common';
import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';

const SurTitle = styled.div`
  font-size: 15px;
  opacity: 0.7;
`;

const Figure = styled.div`
  font-size: 25px;
  font-weight: bold;
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
