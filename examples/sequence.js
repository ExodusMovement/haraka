import React from 'react';
import { Dimensions, View } from 'react-native';

import Behavior from '../behavior';

const { height, width } = Dimensions.get('window');

const Example = () => {
  const rows = [];

  for (let i = 2; i < height / 20; i += 1)
    rows.push(
      <Behavior
        configs={{ mode: 'timing', delay: i * 250 }}
        indices={[0, 1, 2, 3, 4]}
        key={i}
        ref={ref => ref.animateSequence([1, 2, 3, 4])}
        states={[
          { translateX: -width, opacity: 0 },
          { translateX: 0, opacity: 1 },
          { backgroundColor: '#db4437' },
          { backgroundColor: '#0f9d58' },
          { backgroundColor: '#4285f4' }
        ]}
        style={{
          backgroundColor: '#d8d8d8',
          borderRadius: 10,
          height: 10,
          marginTop: 10,
          overflow: 'hidden',
          width: width - 20
        }}
      />
    );

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      {rows}
    </View>
  );
};

export default Example;
