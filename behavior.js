import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class Behavior extends Component {
  nativeValue = new Animated.Value(0);
  value = new Animated.Value(0);

  animateTo = (toValue, configs = {}) => {
    const { mode, callback, ...options } = {
      ...this.props.configs,
      ...configs
    };

    const animate = mode === 'timing' ? Animated.timing : Animated.spring;

    Animated.parallel([
      animate(this.nativeValue, {
        ...options,
        toValue,
        useNativeDriver: true
      }),
      animate(this.value, { ...options, toValue })
    ]).start(animation => {
      if (animation.finished && callback) callback();
    });
  };

  render() {
    const { props, nativeValue, value } = this;
    const { children, initialState, states, style } = props;

    const inputRange = [...Array(states.length).keys()];

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

    const getRange = prop => {
      const range = [];

      for (let i = 0; i < states.length; i += 1) {
        let prevState;

        for (let j = i - 1; j >= 0; j -= 1) {
          prevState = states[j] && states[j][prop];
          if (prevState) break;
        }

        range[i] =
          states[i][prop] ||
          (prevState ||
            ((this.props.style && this.props.style[prop]) ||
              defaultState[prop]));
      }

      return range;
    };

    const backgroundColor = value.interpolate({
      inputRange,
      outputRange: getRange('backgroundColor')
    });

    const height = value.interpolate({
      inputRange,
      outputRange: getRange('height')
    });

    const opacity = nativeValue.interpolate({
      inputRange,
      outputRange: getRange('opacity')
    });

    const rotate = nativeValue.interpolate({
      inputRange,
      outputRange: getRange('rotate')
    });

    const scale = nativeValue.interpolate({
      inputRange,
      outputRange: getRange('scale')
    });

    const translateX = nativeValue.interpolate({
      inputRange,
      outputRange: getRange('translateX')
    });

    const translateY = nativeValue.interpolate({
      inputRange,
      outputRange: getRange('translateY')
    });

    const width = value.interpolate({
      inputRange,
      outputRange: getRange('width')
    });

    const nativeStyles = {
      opacity,
      overflow: 'hidden',
      transform: [{ rotate }, { scale }, { translateX }, { translateY }]
    };

    const styles = { backgroundColor, height, width };

    if (initialState) this.animateTo(initialState);

    return (
      <Animated.View style={[style, nativeStyles]}>
        <Animated.View style={styles}>
          {children}
        </Animated.View>
      </Animated.View>
    );
  }
}
