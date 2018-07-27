import React from 'react';

import { Animated, PanResponder, TouchableOpacity } from 'react-native';

export default class Behavior extends React.PureComponent {
  nativeDriver = this.props.nativeDriver || new Animated.Value(0);
  driver = this.props.driver || new Animated.Value(0);

  index = this.props.initialState;

  static defaultProps = {
    clamp: false,
    config: { mode: 'spring' },
    enableGestures: false,
    initialState: 0,
    state: [{}, {}],
    style: {},
    swipeDistanceThreshold: 10,
    swipeVelocityThreshold: 0.3
  };

  goTo = (value, config = {}) => {
    const { mode, callback, ...options } = {
      ...this.props.config,
      ...config
    };

    const curve = mode === 'timing' ? Animated.timing : Animated.spring;

    const animate = toValue =>
      Animated.parallel([
        curve(this.nativeDriver, {
          ...options,
          toValue,
          useNativeDriver: true
        }),
        curve(this.driver, { ...options, toValue })
      ]);

    if (Array.isArray(value)) {
      const state = [];

      value.forEach(toValue => state.push(animate(toValue)));

      Animated.sequence(state).start(animation => {
        if (animation.finished && callback) callback();
      });

      this.index = state[state.length - 1];
    } else {
      animate(value).start(animation => {
        if (animation.finished && callback) callback();
      });

      this.index = value;
    }
  };

  render() {
    const { nativeDriver, driver } = this;

    const {
      children,
      clamp,
      config,
      driver: _driver,
      enableGestures,
      indices,
      initialState,
      nativeDriver: _nativeDriver,
      onGesture,
      state,
      style,
      swipeDistanceThreshold,
      swipeVelocityThreshold,
      ...viewStyles
    } = this.props;

    const inputRange =
      indices ||
      Array(state.length)
        .fill()
        .map((_, index) => index);

    if (inputRange.length === 1) {
      inputRange.push(1);
      state.push({});
    }

    const getRange = (prop, defaultValue) =>
      state.reduce((range, currentState, index) => {
        const prevState = range[index - 1];

        range.push(
          currentState[prop] || currentState[prop] === 0
            ? currentState[prop]
            : prevState || prevState === 0
              ? prevState
              : style[prop] || style[prop] === 0
                ? style[prop]
                : defaultValue
        );

        return range;
      }, []);

    const addNativeProp = (prop, defaultValue) =>
      nativeDriver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : null
      });

    const addProp = (prop, defaultValue) =>
      driver.interpolate({
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
      nativeDriver.setValue(initialState);
      driver.setValue(initialState);
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

    const NativeBehaviorView = props => (
      <Animated.View style={[style, viewStyles, nativeStyles]} {...props} />
    );

    const BehaviorView = props => <Animated.View style={styles} {...props} />;

    const Touchable = props => (
      <TouchableOpacity
        activeOpacity={1}
        onLongPress={() => onGesture({ longPressed: true })}
        onPress={() => onGesture({ pressed: true })}
        {...props}
      />
    );

    if (enableGestures) {
      return (
        <NativeBehaviorView {...this.pan.panHandlers}>
          <Touchable>
            <Behavior>{children}</Behavior>
          </Touchable>
        </NativeBehaviorView>
      );
    }

    return (
      <NativeBehaviorView>
        <BehaviorView>{children}</BehaviorView>
      </NativeBehaviorView>
    );
  }
}
