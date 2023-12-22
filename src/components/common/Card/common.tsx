import styled from 'styled-components';

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  height: 300px;
  display: flex;
  align-items: center;
  line-height: 1.4;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 100%;
  width: 100%;
`;
const Data = styled.div`
  font-size: 20px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Punch = styled.div`
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Day = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const Figure = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

export {Title, Container, Data, Punch, Day, Figure};
