import {useCallback, useState} from 'react';

const useCardIndex = (cardCount: number) => {
  const [cardIndex, setCardIndex] = useState(0);

  const next = useCallback(() => {
    if (cardIndex === cardCount - 1) return;

    setCardIndex(prev => prev + 1);
  }, [cardCount, cardIndex]);

  const previous = useCallback(() => {
    if (cardIndex === 0) return;

    setCardIndex(prev => prev - 1);
  }, [cardIndex]);

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     next();
  //   }, 10_000);

  //   return () => clearTimeout(timer);
  // }, [next]);

  return [cardIndex, next, previous] as const;
};

export {useCardIndex};
