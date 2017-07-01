import React from 'react';
import { Button, View } from 'react-native';

import Behavior from '../behavior';

const Example = () => {
  let goTo;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Behavior
          ref={ref => (goTo = ref.animateTo)}
          states={[{ scale: 1 }, { scale: 2.5 }, { scale: 5 }, { scale: 10 }]}
          style={{
            backgroundColor: '#d8d8d8',
            borderRadius: 10,
            height: 20,
            overflow: 'hidden',
            width: 20
          }}
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button color="#d8d8d8" title="1x" onPress={() => goTo(0)} />
        <Button color="#d8d8d8" title="2.5x" onPress={() => goTo(1)} />
        <Button color="#d8d8d8" title="5x" onPress={() => goTo(2)} />
        <Button color="#d8d8d8" title="10x" onPress={() => goTo(3)} />
      </View>
    </View>
  );
};

export default Example;
