// inspiration: https://www.uplabs.com/posts/button-filter

import React from 'react';
import { Text, View } from 'react-native';

import Behavior from '../behavior';

const Example = () => {
  const Container = ({ children }) =>
    <Behavior
      config={{ mode: 'timing', duration: 250 }}
      indices={[0, 1]}
      ref={ref => (this.menu = ref)}
      states={[
        { backgroundColor: '#d0d0d0', height: 50 },
        { backgroundColor: '#5cac56', height: 100 }
      ]}
      style={{ borderRadius: 25, overflow: 'hidden', width: 200 }}
      enableGestures
      onGesture={gesture => {
        if (gesture.swipedRight && this.menu.index === 0) {
          this.menu.goTo(1);
          this.highlight.goTo(1);
          this.labels.goTo(1);
          this.dot.goTo(1);
        }

        if (gesture.swipedLeft && this.menu.index === 1) {
          this.menu.goTo(0, { duration: 350 });
          this.highlight.goTo(0, { duration: 350 });
          this.labels.goTo(0, { duration: 350 });
          this.dot.goTo(0, { duration: 350 });
        }

        if (gesture.swipedDown && this.menu.index === 1) {
          this.highlight.goTo(2);
          this.dot.goTo(2);
        }

        if (gesture.swipedUp && this.menu.index === 1) {
          this.highlight.goTo(1);
          this.dot.goTo(1);
        }
      }}>
      {children}
    </Behavior>;

  const Highlight = () =>
    <Behavior
      config={{ mode: 'timing', duration: 250 }}
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
      config={{ mode: 'timing', duration: 250 }}
      indices={[0, 1]}
      ref={ref => (this.labels = ref)}
      states={[{ translateX: -200 }, { translateX: 0 }]}
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
      config={{ mode: 'timing', duration: 250 }}
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
