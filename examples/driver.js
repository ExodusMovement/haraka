import React from 'react';

import { Animated, Dimensions, ScrollView, Text, View } from 'react-native';

import Behavior from '../src/behavior';

const { height, width } = Dimensions.get('window');

const Driver = () => {
  const driver = new Animated.Value(0);

  const onScroll = Animated.event([
    { nativeEvent: { contentOffset: { y: driver } } }
  ]);

  return (
    <View style={styles.container}>
      <Behavior
        clamp
        driver={driver}
        indices={[0, height * 0.5, height, height * 1.5]}
        state={[
          { backgroundColor: '#4285f4' },
          { backgroundColor: '#0f9d58' },
          { backgroundColor: '#f4b400' },
          { backgroundColor: '#db4437' }
        ]}
        style={styles.behavior}
      />

      <ScrollView onScroll={onScroll} scrollEventThrottle={16}>
        <Text style={styles.text}>Scroll</Text>
        <Text style={styles.text}>Scroll</Text>
        <Text style={styles.text}>Scroll</Text>
        <Text style={styles.text}>Scroll</Text>
        <Text style={styles.text}>Scroll</Text>
      </ScrollView>
    </View>
  );
};

const styles = {
  container: { flex: 1 },
  behavior: { position: 'absolute', height, width },
  text: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
    height: height * 0.5
  }
};

export default Driver;
