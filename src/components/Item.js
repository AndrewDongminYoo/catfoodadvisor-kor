import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import styled from 'styled-components/native';
import { images } from '../utils/storage'

const ItemContainer = styled.TouchableOpacity`
  height: 120px;
  width: 95%;
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
`;

const ImageFrame = styled.Image`
  width: 100px;
  border-radius: 10px;
  margin-vertical: 5px;
  margin-right: 10px;
  flex: 1;
`;

const ItemTextContainer = styled.View`
  flex-direction: column;
  flex: 3;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const Item = ({item: { id, 이름, 사용된원료}, onPress}) => {

  return (
    <ItemContainer onPress={() => onPress({id})}>
      <ImageFrame resizeMode="cover" source={{uri:images.sample}}/>
      <ItemTextContainer>
        <ItemTitle numberOfLines={1}>{ 이름 }</ItemTitle>
        <ItemDescription numberOfLines={4}>{ 사용된원료.join(', ') }</ItemDescription>
      </ItemTextContainer>
    </ItemContainer>
  )
}


export default React.memo(Item);