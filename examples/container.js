import React from 'react';

import { Button, Dimensions, View } from 'react-native';

import Behavior from '../src/behavior';

const { height } = Dimensions.get('window');

const Container = () => {
  const container = React.createRef();

  const goTo = state => container.current.goTo(state);

  return (
    <View style={styles.container}>
      <Behavior
        initialState={1}
        ref={container}
        state={[
          { backgroundColor: '#db4437', height: 60 },
          { backgroundColor: '#0f9d58', height: 260 },
          { backgroundColor: '#4285f4', height }
        ]}
        style={styles.behavior}
      />

      <View style={styles.actions}>
        <Button title="Close" color="#fff" onPress={() => goTo(0)} />
        <Button title="Open" color="#fff" onPress={() => goTo(1)} />
        <Button title="Expand" color="#fff" onPress={() => goTo(2)} />
      </View>
    </View>
  );
};

const styles = {
  container: { flex: 1 },
  behavior: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0
  },
  actions: {
    backgroundColor: 'transparent',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  }
};

export default Container;
