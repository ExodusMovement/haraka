import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Behavior from '../behavior';

export default class extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <Behavior
          configs={{ mode: 'timing', duration: 250 }}
          ref={ref => (this.menu = ref)}
          states={[
            { backgroundColor: '#d0d0d0', height: 50 },
            { backgroundColor: '#5cac56', height: 100 }
          ]}
          style={{
            borderRadius: 25,
            overflow: 'hidden',
            width: 200
          }}
          indices={[0, 1]}
          enableGestures
          onGesture={gesture => {
            if (gesture.swipedRight) {
              this.menu.animateTo(1);
              this.highlight.animateTo(1);
              this.labels.animateTo(1);
              this.dot.animateTo(1);
            }
            if (gesture.swipedLeft) {
              this.menu.animateTo(0);
              this.highlight.animateTo(0);
              this.labels.animateTo(0);
              this.dot.animateTo(0);
            }
            if (gesture.swipedDown && this.menu.getIndex() === 1) {
              this.highlight.animateTo(2);
              this.dot.animateTo(2);
            }
            if (gesture.swipedUp && this.menu.getIndex() === 1) {
              this.highlight.animateTo(1);
              this.dot.animateTo(1);
            }
          }}>
          <Behavior
            configs={{ mode: 'timing', duration: 250 }}
            ref={ref => (this.highlight = ref)}
            states={[
              { backgroundColor: 'transparent' },
              { backgroundColor: '#25921e' },
              { translateY: 50 }
            ]}
            style={{
              height: 50,
              overflow: 'hidden',
              width: 200,
              position: 'absolute'
            }}
            indices={[0, 1, 2]}
          />
          <Behavior
            configs={{ mode: 'timing', duration: 250 }}
            ref={ref => (this.labels = ref)}
            states={[{ translateX: -200 }, { translateX: -1 }]}
            indices={[0, 1]}
            style={{
              width: 200,
              height: 100,
              position: 'absolute',
              left: 20,
              top: 15
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                height: 50
              }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                Economy
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                height: 50
              }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                Business
              </Text>
            </View>
          </Behavior>
          <Behavior
            configs={{ mode: 'timing', duration: 250 }}
            ref={ref => (this.dot = ref)}
            states={[{}, { translateX: 200 - 50 }, { translateY: 50 }]}
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              height: 30,
              marginLeft: 10,
              marginTop: 10,
              overflow: 'hidden',
              width: 30
            }}
            indices={[0, 1, 2]}
          />
        </Behavior>
      </View>
    );
  }
}
