import {Container, Data, Title} from '@/components/common/Card/common';
import {GlobalStats} from '@/domain/model/GlobalStats';
import styled from 'styled-components';

const Figure = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Podium = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  gap: 10px;
`;

const Place = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
const Bar = styled.div<{percent: number}>`
  background: white;
  border-radius: 5px;
  height: 50px;
  width: ${({percent}) => `${percent * 100}px`};
`;
const Img = styled.img`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #fff;
`;

const LeaderBoard = ({leaderboards: {drinks}}: GlobalStats, userId: string) => {
  const drinksPodium = Object.entries(drinks).slice(0, 5);

  return (
    <Container>
      <Title>{'Competition is tough 🏆'}</Title>
      <Data>
        <Podium>
          {drinksPodium.map(([userId, {name, picture, amount}], index) => (
            <Place key={index}>
              <Img src={picture} alt={`${name} profile picture`} width={45} height={45} />
              <Bar percent={amount / 200}></Bar>
              <Figure key={userId}>{amount} 🍺</Figure>
            </Place>
          ))}
        </Podium>
        <div></div>
      </Data>
    </Container>
  );
};

export {LeaderBoard};
