import React from 'react';
import { Button, View } from 'react-native';

import Behavior from '../behavior';

const Example = () => {
  let goTo;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Behavior
          config={{ mode: 'timing', duration: 250 }}
          ref={ref => (goTo = ref.goTo)}
          states={[
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
          indices={[0, 1, 2, 3, 4, 5, 6, 7, 8]} // android only
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
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

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
        <Button
          color="#d8d8d8"
          title="play"
          onPress={() => goTo([1, 2, 3, 4, 5, 6, 7, 8])}
        />
        <Button
          color="#d8d8d8"
          title="reset"
          onPress={() => goTo([7, 6, 5, 4, 3, 2, 1, 0])}
        />
      </View>
    </View>
  );
};

export default Example;
