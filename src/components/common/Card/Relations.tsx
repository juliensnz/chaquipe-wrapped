import {Container, Figure, Punch, Title} from '@/components/common/Card/common';
import {EnrichedUserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';

const Data = styled.div`
  font-size: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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

const Big = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const PodiumLabel = styled.div`
font-size: 25px;
`;

const Relations = ({bestFriends, uniquePeople}: EnrichedUserStats['relations']) => {
  const sortedBestFriends = Object.entries(bestFriends).sort(([,{occurrences:a}], [,{occurrences:b}]) => b - a).slice(0,5);
  return (
    <Container>
      <Title>{'You definitely have some best friends 🫂'}</Title>
      <Data>
        <PodiumLabel>Shared moments</PodiumLabel>
        <Podium>
          {sortedBestFriends.map(([userId, {name, picture, occurrences}], index) => (
            <Place key={index}>
              <Img src={picture} alt={`${name} profile picture`} width={45} height={45} />
              <Bar percent={occurrences / Math.max(...sortedBestFriends.map(([,{occurrences}]) => occurrences)) * 2.5}></Bar>
              <Figure key={userId}>{occurrences}</Figure>
            </Place>
          ))}
        </Podium>
        <Punch>
          In total, you have crossed paths with <Big>{uniquePeople} unique people</Big> at the Chaquip!
        </Punch>
        <div></div>
      </Data>
    </Container>
  );
};

export {Relations};
