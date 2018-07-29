import React from 'react';

import { Button, View } from 'react-native';

import Behavior from '../src/behavior';

const Basic = () => {
  const basic = React.createRef();

  const goTo = state => basic.current.goTo(state);

  return (
    <View style={styles.container}>
      <View style={styles.behaviorContainer}>
        <Behavior
          ref={basic}
          state={[
            { backgroundColor: '#d8d8d8', scale: 1 },
            { backgroundColor: '#4285f4', scale: 2.5 },
            { backgroundColor: '#0f9d58', scale: 5 },
            { backgroundColor: '#f4b400', scale: 10 }
          ]}
          style={styles.behavior}
        />
      </View>

      <View style={styles.steps}>
        <Button color="#d8d8d8" title="1x" onPress={() => goTo(0)} />
        <Button color="#4285f4" title="2.5x" onPress={() => goTo(1)} />
        <Button color="#0f9d58" title="5x" onPress={() => goTo(2)} />
        <Button color="#f4b400" title="10x" onPress={() => goTo(3)} />
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
  steps: { flexDirection: 'row', justifyContent: 'space-around' }
};

export default Basic;
