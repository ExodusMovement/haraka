import React, { Component } from 'react';
import { Animated, PanResponder, TouchableOpacity } from 'react-native';

export default class extends Component {
  static defaultProps = {
    config: { mode: 'spring' },
    initialState: 0,
    style: {},
    enableGestures: false,
    clamp: false,
    swipeVelocityThreshold: 0.3,
    swipeDistanceThreshold: 10
  };

  nativeValue = this.props.animatedNativeValue || new Animated.Value(0);
  value = this.props.animatedValue || new Animated.Value(0);

  index = this.props.initialState;

  goTo = (value, config = {}) => {
    const { mode, callback, ...options } = {
      ...this.props.config,
      ...config
    };

    const curve = mode === 'timing' ? Animated.timing : Animated.spring;

    const animate = toValue =>
      Animated.parallel([
        curve(this.nativeValue, { ...options, toValue, useNativeDriver: true }),
        curve(this.value, { ...options, toValue })
      ]);

    if (Array.isArray(value)) {
      const states = [];

      value.forEach(toValue => states.push(animate(toValue)));

      Animated.sequence(states).start(animation => {
        if (animation.finished && callback) callback();
      });

      this.index = states[states.length - 1];
    } else {
      animate(value).start(animation => {
        if (animation.finished && callback) callback();
      });

      this.index = value;
    }
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
      style,
      swipeVelocityThreshold,
      swipeDistanceThreshold
    } = this.props;

    const inputRange =
      indices ||
      Array(states.length)
        .fill()
        .map((_, index) => index);

    const getRange = (prop, defaultValue) =>
      states.reduce((range, state, i) => {
        const prevState = range[i - 1];

        range.push(
          state[prop] || state[prop] === 0
            ? state[prop]
            : prevState || prevState === 0
              ? prevState
              : style[prop] || style[prop] === 0
                ? style[prop]
                : defaultValue
        );

        return range;
      }, []);

    const addNativeProp = (prop, defaultValue) =>
      nativeValue.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : null
      });

    const addProp = (prop, defaultValue) =>
      value.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : null
      });

    const opacity = addNativeProp('opacity', 1);
    const rotate = addNativeProp('rotate', '0deg');
    const rotateX = addNativeProp('rotateX', '0deg');
    const rotateY = addNativeProp('rotateY', '0deg');
    const scale = addNativeProp('scale', 1);
    const scaleX = addNativeProp('scaleX', 1);
    const scaleY = addNativeProp('scaleY', 1);
    const translateX = addNativeProp('translateX', 0);
    const translateY = addNativeProp('translateY', 0);

    const backgroundColor = addProp('backgroundColor', 'transparent');
    const height = addProp('height', null);
    const width = addProp('width', null);

    const nativeStyles = {
      opacity,
      transform: [
        { rotate },
        { rotateX },
        { rotateY },
        { scale },
        { scaleX },
        { scaleY },
        { translateX },
        { translateY }
      ]
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

      this.pan = PanResponder.create({
        onMoveShouldSetPanResponder: e => e.nativeEvent.touches.length === 1,
        onPanResponderMove: (e, { dx, dy, vx, vy }) => {
          if (
            Math.abs(vx) > swipeVelocityThreshold &&
            Math.abs(dy) < swipeDistanceThreshold
          ) {
            swipeVelocity = vx;
            swipeDistance = dx;

            if (dx < 0) swiped = 'left';
            else if (dx > 0) swiped = 'right';
          } else if (
            Math.abs(vy) > swipeVelocityThreshold &&
            Math.abs(dx) < swipeDistanceThreshold
          ) {
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

    const NativeBehavior = props => (
      <Animated.View style={[style, nativeStyles]} {...props} />
    );

    const Behavior = props => <Animated.View style={styles} {...props} />;

    const Touchable = props => (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => onGesture({ longPressed: true })}
        onPress={() => onGesture({ pressed: true })}
        {...props}
      />
    );

    if (enableGestures)
      return (
        <NativeBehavior {...this.pan.panHandlers}>
          <Touchable>
            <Behavior>{children}</Behavior>
          </Touchable>
        </NativeBehavior>
      );

    return (
      <NativeBehavior>
        <Behavior>{children}</Behavior>
      </NativeBehavior>
    );
  }
}
