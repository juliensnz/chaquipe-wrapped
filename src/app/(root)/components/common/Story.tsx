import {Card} from '@/app/(root)/components/common/Card';
import {Loader} from '@/app/(root)/components/common/Loader';
import {useCardIndex} from '@/app/(root)/components/hooks/useCardIndex';
import {Payment} from '@/domain/model/Payment';
import {useQuery} from '@tanstack/react-query';
import styled from 'styled-components';

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

type StoryProps = {userId: string};

const Story = ({userId}: StoryProps) => {
  const {data, isFetching, isError} = useQuery(['payments', userId], async () => {
    const response = await fetch(`/api/${userId}`, {});
    await new Promise(resolve => setTimeout(resolve, 1_000));
    return await response.json();
  });

  const cards = data
    ? [
        data.map((payment: Payment) => <div key={payment.id}>{new Date(payment.time).toLocaleDateString()}</div>),
        1,
        2,
        3,
        4,
        5,
        6,
      ]
    : [];
  const [currentCardIndex, next, previous] = useCardIndex(cards.length);

  if (isFetching) {
    return (
      <Center>
        <Loader size={80} color="black" />
        Wrapping your chaquip year...
      </Center>
    );
  }
  if (isError) {
    return <div>an error occured yolo</div>;
  }

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
