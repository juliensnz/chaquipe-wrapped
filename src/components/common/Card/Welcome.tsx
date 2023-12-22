import {Container, Data, Title} from '@/components/common/Card/common';
import {Client} from '@/domain/model/Client';
import styled from 'styled-components';

const Img = styled.img`
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #fff;
`;

const Welcome = ({profile: {image_192, first_name, last_name}}: Client) => {
  return (
    <Container>
      <Title>{`Welcome to your Chaquip wrapped, ${first_name} ${last_name} ! 😺`}</Title>
      <Data>
        <Img src={image_192} alt={`${first_name} ${last_name} profile picture`} width={192} height={192} />
      </Data>
      <Data></Data>
    </Container>
  );
};

export {Welcome};
