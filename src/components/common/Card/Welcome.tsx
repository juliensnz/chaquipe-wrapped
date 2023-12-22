import {Client} from '@/domain/model/Client';
import styled from 'styled-components';

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

const Punch = styled.div`
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Welcome = ({profile:{first_name, last_name}}: Client) => {
  return (
    <Container>
      <Title>{`Welcome to your chaquip wrapped, ${first_name} ${last_name} ! 😺`}</Title>
      <Data>
        <Punch>
          punch
        </Punch>
      </Data>
    </Container>
  );
};

export {Welcome};
