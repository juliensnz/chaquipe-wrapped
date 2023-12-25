import {Container, Data, Punch, Title} from '@/components/common/Card/common';
import {Client} from '@/domain/model/Client';
import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {emojisplosions} from 'emojisplosion';

const Img = styled.img`
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
`;
const Big = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const ShareTheLove = ({profile: {image_192, first_name, last_name}}: Client) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const {cancel} = emojisplosions({
      emojis: ['🎉', '🥰', '🍻', '💬', '🎁'],
      container: document.body,
      emojiCount: 10,
    });

    return cancel;
  }, []);

  return (
    <Container ref={ref}>
      <Title>{`And that's a wrap! 🎁`}</Title>
      <Data>
        <Img src={image_192} alt={`${first_name} ${last_name} profile picture`} width={192} height={192} />
        <Punch>
          Share this URL with your friends or invite them to type the /chaquip command on slack.
          <br />
          <Big>See you arround! 😘</Big>
        </Punch>
      </Data>
    </Container>
  );
};

export {ShareTheLove};
