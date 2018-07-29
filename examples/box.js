import React from 'react';

import { Button, View } from 'react-native';

import Behavior from '../src/behavior';

const Box = () => {
  const box = React.createRef();

  const goTo = state => box.current.goTo(state);

  const play = () => goTo([1, 2, 3, 4, 5, 6, 7, 8]);
  const reset = () => goTo([7, 6, 5, 4, 3, 2, 1, 0]);

  return (
    <View style={styles.container}>
      <View style={styles.behaviorContainer}>
        <Behavior
          config={{ type: 'timing', duration: 250 }}
          ref={box}
          state={[
            { backgroundColor: '#d8d8d8', height: 100, width: 100 },
            { backgroundColor: '#0f9d58' },
            { height: 150 },
            { opacity: 0.5 },
            { rotate: '45deg' },
            { scale: 1.5 },
            { translateX: -50 },
            { translateY: -50 },
            { width: 150 }
          ]}
        />
      </View>

      <View style={styles.steps}>
        <Button color="#d8d8d8" title="original" onPress={() => goTo(0)} />
        <Button color="#d8d8d8" title="backgroundC" onPress={() => goTo(1)} />
        <Button color="#d8d8d8" title="height" onPress={() => goTo(2)} />
        <Button color="#d8d8d8" title="opacity" onPress={() => goTo(3)} />
        <Button color="#d8d8d8" title="rotate" onPress={() => goTo(4)} />
        <Button color="#d8d8d8" title="scale" onPress={() => goTo(5)} />
        <Button color="#d8d8d8" title="translateX" onPress={() => goTo(6)} />
        <Button color="#d8d8d8" title="translateY" onPress={() => goTo(7)} />
        <Button color="#d8d8d8" title="width" onPress={() => goTo(8)} />
      </View>

      <View style={styles.actions}>
        <Button color="#d8d8d8" title="play" onPress={play} />
        <Button color="#d8d8d8" title="reset" onPress={reset} />
      </View>
    </View>
  );
};

const styles = {
  container: { flex: 1 },
  behaviorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  behavior: {
    borderRadius: 10,
    height: 20,
    overflow: 'hidden',
    width: 20
  },
  steps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

export default Box;
