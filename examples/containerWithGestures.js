import React from 'react';
import { Dimensions, View } from 'react-native';

import Behavior from '../behavior';

const { height, width } = Dimensions.get('window');

const Example = () =>
  <View style={{ flex: 1 }}>
    <Behavior
      ref={ref => (this.container = ref)}
      states={[
        { backgroundColor: '#db4437', height: 100 },
        { backgroundColor: '#0f9d58', height: 300 },
        { backgroundColor: '#4285f4', height: height - 20 }
      ]}
      style={{
        bottom: 0,
        position: 'absolute',
        width
      }}
      enableGestures
      onGesture={gesture => {
        if (gesture.swipedUp)
          if (this.container.index === 0) this.container.goTo(1);
          else this.container.goTo(2);
        else if (gesture.swipedDown)
          if (this.container.index === 2) this.container.goTo(1);
          else this.container.goTo(0);
      }}
      indices={[0, 1, 2]} // android only
      swipeThreshold={{ distance: 40 }}
    />
  </View>;

export default Example;
