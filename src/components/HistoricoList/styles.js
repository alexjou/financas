import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #505050;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 20px;
  box-shadow: 2px 2px rgba(0,0,0,0.40);
  border-radius: 20px;
`;
export const Subcontainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Tipo = styled.View`
  flex-direction: row;
`;
export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props => props.tipo === 'despesa' ? '#FF0000' : '#049301'};
  padding-bottom: 7px;
  padding-top: 3px;
  padding-left: 8px;
  padding-right: 14px;
  border-radius: 7px;
`;
export const TipoText = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-style: italic;
`;
export const ValorText = styled.Text`
  color: #FFF;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const DateText = styled.Text`
  color: #FFF;
  font-size: 16px;
`;
export const Title = styled.Text`
  color: #FFF;
  font-size: 22px;
  font-weight: bold;
`;