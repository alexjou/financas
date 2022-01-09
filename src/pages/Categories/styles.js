import { Animated } from "react-native";
import styled from 'styled-components/native';

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;
export const Container = styled.KeyboardAvoidingView`
  justify-content: center;
`;
export const Input = styled.TextInput`
  height: 50px;
  width: 90%;
  background-color: rgba(255,255,255,0.9);
  margin-top: 20px;
  font-size: 17px;
  padding-left: 8px;
`;
export const SubmitButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  background-color: #00b94a;

`;
export const SubmitText = styled.Text`
  font-size: 21px;
  font-weight: bold;
  color:#FFF;
`;
export const Logo = styled.Image`
  margin-bottom: 15px;
`;

export const Containers = styled(Animated.View)`
  height: 100px;
  margin-top: 20px;
`;

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: { paddingLeft: 10, paddingRight: 20 },
  showsHorizontalScrollIndicator: false,
})``;

export const TabItem = styled.View`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  margin-left: 10px;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
`;
export const TabText = styled.Text`
  font-size: 13px;
  color: #fff;
  padding-bottom: 15px;
`;