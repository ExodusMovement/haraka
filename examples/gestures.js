import React from 'react';
import { Dimensions, View } from 'react-native';

import Behavior from '../behavior';

const { width } = Dimensions.get('window');

const Example = () => {
  let goTo;

  const l = width / 4;

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Behavior
        ref={ref => (goTo = ref.animateTo)}
        states={[{ translateX: 0 }, { translateX: width - l }]}
        style={{
          backgroundColor: '#d8d8d8',
          height: l,
          width: l
        }}
        enableGestures
        onGesture={gesture => {
          if (gesture.swipedLeft) goTo(0);
          if (gesture.swipedRight) goTo(1);
          if (gesture.pressed) alert('Pressed!');
          if (gesture.longPressed) alert('Long pressed!');
        }}
        indices={[0, 1]} // android only
      />
    </View>
  );
};

export default Example;
