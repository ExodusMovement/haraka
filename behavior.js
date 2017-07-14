import React, { Component } from 'react';
import { Animated, PanResponder, TouchableOpacity } from 'react-native';

export default class extends Component {
  getIndex = () => this.index;

  index = this.props.initialState || 0;

  nativeValue = this.props.animatedNativeValue || new Animated.Value(0);
  value = this.props.animatedValue || new Animated.Value(0);

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

  animateSequence = (values, configs = {}) => {
    const { mode, callback, ...options } = {
      ...this.props.configs,
      ...configs
    };

    const animate = mode === 'timing' ? Animated.timing : Animated.spring;

    const states = [];

    values.forEach(toValue =>
      states.push(
        Animated.parallel([
          animate(this.nativeValue, {
            ...options,
            toValue,
            useNativeDriver: true
          }),
          animate(this.value, { ...options, toValue })
        ])
      )
    );

    Animated.sequence(states).start(animation => {
      if (animation.finished && callback) callback();
    });

    this.index = values[values.length - 1];
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

    const inputRange = indices || [...Array(states.length).keys()];

    const defaultState = {
      backgroundColor: 'transparent',
      height: null,
      opacity: 1,
      rotate: '0deg',
      scale: 1,
      translateX: 0,
      translateY: 0,
      width: null
    };

    const getRange = prop =>
      states.reduce((range, state, i) => {
        const prevState = range[i - 1];

        range.push(
          state[prop] || state[prop] === 0
            ? state[prop]
            : prevState || prevState === 0
              ? prevState
              : style[prop] || style[prop] === 0
                ? style[prop]
                : defaultState[prop]
        );

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
