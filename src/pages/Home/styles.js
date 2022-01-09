import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.View`
  align-items: center;
  margin-left: 15px;
  margin-bottom: 25px;
`;

export const Name = styled.Text`
  font-size: 19px;
  color: #FFF;
  font-style: italic;
`;

export const Saldo = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  color: #FFF;
  font-weight: bold;
`;

export const Title = styled.Text`
  margin-left: 15px;
  color: #00b94a;
`;

export const List = styled.FlatList.attrs({
  marginHorizontal: 15,
  paddingBottom: 20,
})`
  padding-top: 15px;  
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const Area = styled.View`
  flex-direction: row;
  margin-left: 15px;
  align-items: baseline;
`;
