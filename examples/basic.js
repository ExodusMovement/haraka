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
          states={[
            { backgroundColor: '#d8d8d8', scale: 1 },
            { backgroundColor: '#4285f4', scale: 2.5 },
            { backgroundColor: '#0f9d58', scale: 5 },
            { backgroundColor: '#f4b400', scale: 10 }
          ]}
          style={{
            borderRadius: 10,
            height: 20,
            overflow: 'hidden',
            width: 20
          }}
          indices={[0, 1, 2, 3]} // android only
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button color="#d8d8d8" title="1x" onPress={() => goTo(0)} />
        <Button color="#4285f4" title="2.5x" onPress={() => goTo(1)} />
        <Button color="#0f9d58" title="5x" onPress={() => goTo(2)} />
        <Button color="#f4b400" title="10x" onPress={() => goTo(3)} />
      </View>
    </View>
  );
};

export default Example;
