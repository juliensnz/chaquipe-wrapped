import {Title} from '@/components/common/Card/common';
import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
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

  & > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
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
