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

const Consumption = ({drinksPerHour, numberOfDrinks, numberOfRequiredAnts}: UserStats['personnalConsumption']) => {
  return (
    <Container>
      <Title>{"We're all here for the same thing... 🍻"}</Title>
      <Data>
        <Day>
          <div>
            <SurTitle>You ordered</SurTitle>
            <Figure>{numberOfDrinks} drinks </Figure>
            <SurTitle>for yourself</SurTitle>
          </div>
          <div>
            <SurTitle>On average, you had</SurTitle>
            <Figure>
              {drinksPerHour} drink{drinksPerHour > 1 ? 's' : ''}
            </Figure>
            <SurTitle>per hour!</SurTitle>
          </div>
        </Day>
        <Punch>
          In one sitting, it would require <Big>{Intl.NumberFormat('en-US').format(numberOfRequiredAnts)}</Big> ants to
          drink it all ! 🐜
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {Consumption};
