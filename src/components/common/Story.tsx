import {Card} from '@/components/common/Card';
import {Generosity} from '@/components/common/Card/Generosity';
import {LatestNight} from '@/components/common/Card/LatestNight';
import {useCardIndex} from '@/components/hooks/useCardIndex';
import {UserStats} from '@/domain/model/UserStats';
import styled from 'styled-components';
import {DaysOfTheWeek} from './Card/DaysOfTheWeek';
import {Consumption} from './Card/Consumption';
import {Welcome} from './Card/Welcome';

const Center = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  background-color: #1c1c1c;
  background: linear-gradient(180deg, #1c1c1c 100%, #000000 0);
`;

const Container = styled.div`
  max-width: 500px;
  max-height: 1000px;
  width: 100vw;
  height: 100vh;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const Pils = styled.div`
  z-index: 1;
  width: 100%;
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
    <Welcome key="welcome" {...stats.client} />,
    <DaysOfTheWeek key="daysOfTheWeek" {...stats.visits} />,
    <LatestNight key="latestNight" {...stats.latestNight} totalTimeSpent={stats.totalTimeSpent} />,
    <Consumption key="consumption" {...stats.personnalConsumption} />,
    <Generosity key="generosity" {...stats.rounds} />,
    4,
    5,
    6,
  ];
  const [currentCardIndex, next, previous] = useCardIndex(cards.length);

  return (
    <Center>
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
    </Center>
  );
};

export {Story};
