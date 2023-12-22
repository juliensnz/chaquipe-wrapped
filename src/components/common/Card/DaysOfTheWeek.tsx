import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';
import {getDayOfTheWeekAsString} from '@/domain/model/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
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
  align-items: flex-end;
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

const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  gap: 10px;
`;

const DayOfWeek = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const Bar = styled.div<{percent: number}>`
  background: white;
  border-radius: 5px;
  width: 50px;
  height: ${({percent}) => `${percent * 100}px`};
`;
const Label = styled.div``;

const DaysOfTheWeek = ({days, favouriteDay, totalVisits}: UserStats['visits']) => {
  const filteredDays = Object.values(days).filter((_, index) => index !== 0 && index !== 6);
  const maxDay = filteredDays.reduce((max, day) => Math.max(max, day), 0);

  return (
    <Container>
      <Title>{'Any day is a good day for a drink ! 📅'}</Title>
      <Data>
        <Day>
          <Week>
            {/* TODO: chart of the week ? */}
            {filteredDays.map((day, index) => (
              <DayOfWeek key={index}>
                <Figure>{day}</Figure>
                <Bar percent={day / maxDay}></Bar>
                <Label>{getDayOfTheWeekAsString(index + 1).slice(0, 2)}</Label>
              </DayOfWeek>
            ))}
          </Week>
        </Day>
        <Punch>
          You visited the Chaquip on <Big>{totalVisits}</Big> different days
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {DaysOfTheWeek};
