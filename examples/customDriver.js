import React from 'react';
import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';

import Behavior from '../behavior';

const { height, width } = Dimensions.get('window');

const Example = () => {
  const animatedNativeValue = new Animated.Value(0);
  const animatedValue = new Animated.Value(0);

  const onScroll =
    Animated.event([
      { nativeEvent: { contentOffset: { y: animatedNativeValue } } }
    ]) &&
    Animated.event([{ nativeEvent: { contentOffset: { y: animatedValue } } }]);

  const textStyle = {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    height: height * 0.5
  };

  return (
    <View style={{ flex: 1 }}>
      <Behavior
        indices={[0, height * 0.5, height, height * 1.5]}
        states={[
          { backgroundColor: '#4285f4' },
          { backgroundColor: '#0f9d58' },
          { backgroundColor: '#f4b400' },
          { backgroundColor: '#db4437' }
        ]}
        style={{ height, position: 'absolute', width }}
        animatedNativeValue={animatedNativeValue}
        animatedValue={animatedValue}
        clamp
      />
      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <Text style={textStyle}>Scroll</Text>
        <Text style={textStyle}>Scroll</Text>
        <Text style={textStyle}>Scroll</Text>
        <Text style={textStyle}>Scroll</Text>
        <Text style={textStyle}>Scroll</Text>
      </ScrollView>
    </View>
  );
};

export default Example;
