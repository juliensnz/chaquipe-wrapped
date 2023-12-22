import {Title} from '@/components/common/Card/common';
import {Client} from '@/domain/model/Client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
`;

const Data = styled.div`
  font-size: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Punch = styled.div`
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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
    </Container>
  );
};

export {Welcome};
