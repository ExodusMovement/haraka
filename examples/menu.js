import React, { Component } from 'react';
import { View } from 'react-native';

import Behavior from '../behavior';

export default class extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Behavior
          ref={ref => (this.menu = ref)}
          states={[{}, {}]}
          style={{
            backgroundColor: '#d8d8d8',
            borderRadius: 20,
            height: 40,
            overflow: 'hidden',
            width: 200
          }}
          indices={[0, 1]}>
          <View
            style={{
              height: 20,
              width: 20,
              marginLeft: 20,
              backgroundColor: 'red'
            }}
          />
        </Behavior>
      </View>
    );
  }
}
