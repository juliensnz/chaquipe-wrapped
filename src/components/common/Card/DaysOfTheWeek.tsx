import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';
import {getDayOfTheWeekAsString} from '@/domain/model/utils';

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

const DaysOfTheWeek = ({days, favouriteDay}: UserStats['visitsPerDay']) => {
  return (
    <Container>
      <Title>{'Any day is a good day for a drink ! 📅'}</Title>
      <Data>
        <Day>
          <div>
            {/* TODO: chart of the week ? */}
            {Object.values(days).map((day, index) => (<Figure key={index}>{`${getDayOfTheWeekAsString(index)}: ${day}`}</Figure>))}
          </div>
        </Day>
        <Punch>
        Your favorite day is <Big>{getDayOfTheWeekAsString(favouriteDay.day)}</Big> with {favouriteDay.numberOfVisits} visits!
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {DaysOfTheWeek};
