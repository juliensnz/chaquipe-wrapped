import {Card} from '@/components/common/Card';
import {Generosity} from '@/components/common/Card/Generosity';
import {LatestNight} from '@/components/common/Card/LatestNight';
import {useCardIndex} from '@/components/hooks/useCardIndex';
import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';
import {DaysOfTheWeek} from './Card/DaysOfTheWeek';

const Center = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Container = styled.div``;
const Pils = styled.div`
  width: 100vw;
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  box-sizing: border-box;
`;

const Pil = styled.div<{isCurrent?: boolean}>`
  height: 5px;
  flex: 1;
  border-radius: 5px;
  background-color: ${({isCurrent}) => (isCurrent ? 'white' : 'rgba(255, 255, 255, 0.5)')};
`;

type StoryProps = {stats: UserStats};

const Story = ({stats}: StoryProps) => {
  const cards = [
    <LatestNight key="latestNight" {...stats.latestNight} totalTimeSpent={stats.totalTimeSpent} />,
    <Generosity key="generosity" {...stats.totalRounds} />,
    <DaysOfTheWeek key="daysOfTheWeek" {...stats.visitsPerDay}/>,
    3,
    4,
    5,
    6,
  ];
  const [currentCardIndex, next, previous] = useCardIndex(cards.length);

  return (
    <Container>
      <Pils>
        {cards.map((_, index) => (
          <Pil key={index} isCurrent={currentCardIndex === index} />
        ))}
      </Pils>
      {cards.map((card, index) => (
        <Card key={index} onNext={next} onPrevious={previous} isVisible={currentCardIndex === index}>
          {card}
        </Card>
      ))}
    </Container>
  );
};

export {Story};
