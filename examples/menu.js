// inspiration: https://www.uplabs.com/posts/button-filter

import React from 'react';
import { Text, View } from 'react-native';

import Behavior from '../behavior';

const Example = () => {
  const Container = ({ children }) =>
    <Behavior
      configs={{ mode: 'timing', duration: 250 }}
      indices={[0, 1]}
      ref={ref => (this.menu = ref)}
      states={[
        { backgroundColor: '#d0d0d0', height: 50 },
        { backgroundColor: '#5cac56', height: 100 }
      ]}
      style={{ borderRadius: 25, overflow: 'hidden', width: 200 }}
      enableGestures
      onGesture={gesture => {
        if (gesture.swipedRight && this.menu.getIndex() === 0) {
          this.menu.animateTo(1);
          this.highlight.animateTo(1);
          this.labels.animateTo(1);
          this.dot.animateTo(1);
        }

        if (gesture.swipedLeft && !gesture.swipedDown && !gesture.swipedUp) {
          this.menu.animateTo(0, { duration: 350 });
          this.highlight.animateTo(0, { duration: 350 });
          this.labels.animateTo(0, { duration: 350 });
          this.dot.animateTo(0, { duration: 350 });
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
      {children}
    </Behavior>;

  const Highlight = () =>
    <Behavior
      configs={{ mode: 'timing', duration: 250 }}
      indices={[0, 1, 2]}
      ref={ref => (this.highlight = ref)}
      states={[
        { backgroundColor: 'transparent' },
        { backgroundColor: '#25921e' },
        { translateY: 50 }
      ]}
      style={{
        height: 50,
        overflow: 'hidden',
        position: 'absolute',
        width: 200
      }}
    />;

  const Labels = () =>
    <Behavior
      configs={{ mode: 'timing', duration: 250 }}
      indices={[0, 1]}
      ref={ref => (this.labels = ref)}
      states={[{ translateX: -200 }, { translateX: -1 }]}
      style={{
        height: 100,
        left: 20,
        position: 'absolute',
        top: 15,
        width: 200
      }}>
      <View style={{ height: 50 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Economy
        </Text>
      </View>
      <View style={{ height: 50 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Business
        </Text>
      </View>
    </Behavior>;

  const Dot = () =>
    <Behavior
      configs={{ mode: 'timing', duration: 250 }}
      indices={[0, 1, 2]}
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
    />;

  const Menu = () =>
    <Container>
      <Highlight />
      <Labels />
      <Dot />
    </Container>;

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Menu />
    </View>
  );
};

export default Example;
