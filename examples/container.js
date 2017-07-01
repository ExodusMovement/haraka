import React from 'react';
import { Button, Dimensions, View } from 'react-native';

import Behavior from '../behavior';

const { height, width } = Dimensions.get('window');

const Example = () => {
  let goTo;

  return (
    <View style={{ flex: 1 }}>
      <Behavior
        initialState={1}
        ref={ref => (goTo = ref.animateTo)}
        states={[
          { backgroundColor: '#db4437', height: 60 },
          { backgroundColor: '#0f9d58', height: 260 },
          { backgroundColor: '#4285f4', height: height - 20 }
        ]}
        style={{
          bottom: 0,
          position: 'absolute',
          width
        }}
        indices={[0, 1, 2]} // android only
      />

      <View
        style={{
          backgroundColor: 'transparent',
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0
        }}>
        <Button title="Close" color="#fff" onPress={() => goTo(0)} />
        <Button title="Open" color="#fff" onPress={() => goTo(1)} />
        <Button title="Expand" color="#fff" onPress={() => goTo(2)} />
      </View>
    </View>
  );
};

export default Example;
