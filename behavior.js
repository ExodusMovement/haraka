import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  TouchableOpacity
} from 'react-native';

export default class extends Component {
  getIndex = () => this.index;

  index = this.props.initialState || 0;

  nativeValue = new Animated.Value(0);
  value = new Animated.Value(0);

  animateTo = (toValue, configs = {}) => {
    const { mode, callback, ...options } = {
      ...this.props.configs,
      ...configs
    };

    const animate = mode === 'timing' ? Animated.timing : Animated.spring;

    Animated.parallel([
      animate(this.nativeValue, { ...options, toValue, useNativeDriver: true }),
      animate(this.value, { ...options, toValue })
    ]).start(animation => {
      if (animation.finished && callback) callback();
    });

    this.index = toValue;
  };

  render() {
    const { nativeValue, value } = this;

    const {
      children,
      clamp,
      enableGestures,
      indices,
      initialState,
      onGesture,
      states,
      swipeThreshold
    } = this.props;

    const style = this.props.style || {};

    const inputRange =
      Platform.OS === 'android' ? indices : [...Array(states.length).keys()];

    const defaultState = {
      backgroundColor: 'transparent',
      height: 0,
      opacity: 1,
      rotate: '0deg',
      scale: 1,
      translateX: 0,
      translateY: 0,
      width: 0
    };

    const getRange = prop =>
      states.reduce((range, state, i) => {
        let propValue = defaultState[prop];

        [style[prop], range[i - 1], state[prop]].forEach(possibleValue => {
          if (possibleValue) propValue = possibleValue;
          else if (possibleValue === 0) propValue = 0;
        });

        range.push(propValue);

        return range;
      }, []);

    const addNativeProp = prop =>
      nativeValue.interpolate({
        inputRange,
        outputRange: getRange(prop),
        extrapolate: clamp ? 'clamp' : null
      });

    const addProp = prop =>
      value.interpolate({
        inputRange,
        outputRange: getRange(prop),
        extrapolate: clamp ? 'clamp' : null
      });

    const opacity = addNativeProp('opacity');
    const rotate = addNativeProp('rotate');
    const scale = addNativeProp('scale');
    const translateX = addNativeProp('translateX');
    const translateY = addNativeProp('translateY');

    const backgroundColor = addProp('backgroundColor');
    const height = addProp('height');
    const width = addProp('width');

    const nativeStyles = {
      opacity,
      transform: [{ rotate }, { scale }, { translateX }, { translateY }]
    };

    const styles = { backgroundColor, height, width };

    if (initialState) {
      nativeValue.setValue(initialState);
      value.setValue(initialState);
    }

    if (enableGestures) {
      let swiped;
      let swipeVelocity = null;
      let swipeDistance = null;

      const velocityThr = (swipeThreshold && swipeThreshold.velocity) || 0.3;
      const distanceThr = (swipeThreshold && swipeThreshold.distance) || 10;

      this.pan = PanResponder.create({
        onMoveShouldSetPanResponder: e => e.nativeEvent.touches.length === 1,
        onPanResponderMove: (e, { dx, dy, vx, vy }) => {
          if (Math.abs(vx) > velocityThr && Math.abs(dy) < distanceThr) {
            swipeVelocity = vx;
            swipeDistance = dx;

            if (dx < 0) swiped = 'left';
            else if (dx > 0) swiped = 'right';
          } else if (Math.abs(vy) > velocityThr && Math.abs(dx) < distanceThr) {
            swipeVelocity = vy;
            swipeDistance = dy;

            if (dy < 0) swiped = 'up';
            else if (dy > 0) swiped = 'down';
          }
        },
        onPanResponderRelease: () => {
          if (swiped && onGesture) {
            onGesture({
              swipedLeft: swiped === 'left',
              swipedRight: swiped === 'right',
              swipedUp: swiped === 'up',
              swipedDown: swiped === 'down',
              swipeVelocity,
              swipeDistance
            });

            swiped = null;
            swipeVelocity = null;
            swipeDistance = null;
          }
        }
      });
    }

    const NativeBehavior = props =>
      <Animated.View style={[style, nativeStyles]} {...props} />;

    const Behavior = props => <Animated.View style={styles} {...props} />;

    const Touchable = props =>
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => onGesture({ longPressed: true })}
        onPress={() => onGesture({ pressed: true })}
        {...props}
      />;

    if (enableGestures)
      return (
        <NativeBehavior {...this.pan.panHandlers}>
          <Touchable>
            <Behavior>
              {children}
            </Behavior>
          </Touchable>
        </NativeBehavior>
      );

    return (
      <NativeBehavior>
        <Behavior>
          {children}
        </Behavior>
      </NativeBehavior>
    );
  }
}
