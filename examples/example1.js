import React from 'react';
import { Button, View } from 'react-native';

import Behavior from '../behavior';

const Example = () => {
  let index;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Behavior
          configs={{ mode: 'timing', duration: 250 }}
          ref={ref => (index = ref.animateTo)}
          states={[
            { backgroundColor: '#db4437', height: 100, width: 100 },
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

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
        <Button color="#4285f4" title="reset" onPress={() => index(0)} />
        <Button color="#4285f4" title="backgroundC" onPress={() => index(1)} />
        <Button color="#4285f4" title="height" onPress={() => index(2)} />
        <Button color="#4285f4" title="opacity" onPress={() => index(3)} />
        <Button color="#4285f4" title="rotate" onPress={() => index(4)} />
        <Button color="#4285f4" title="scale" onPress={() => index(5)} />
        <Button color="#4285f4" title="translateX" onPress={() => index(6)} />
        <Button color="#4285f4" title="translateY" onPress={() => index(7)} />
        <Button color="#4285f4" title="width" onPress={() => index(8)} />
      </View>
    </View>
  );
};

export default Example;
