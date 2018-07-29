import React from 'react';

import { Animated } from 'react-native';

export default class Behavior extends React.PureComponent {
  static defaultProps = {
    clamp: false,
    config: { type: 'spring' },
    initialState: 0,
    state: [{}, {}],
    style: {},
    unmounted: false
  };

  constructor(props) {
    super(props);

    const { initialState, nativeDriver, driver, unmounted } = this.props;

    this.nativeDriver = nativeDriver || new Animated.Value(initialState);
    this.driver = driver || new Animated.Value(initialState);

    this.key = initialState;

    this.state = { mounted: !unmounted };
  }

  unmount = () => this.setState({ mounted: false });

  mount = state => {
    const { initialState } = this.props;

    this.nativeDriver.setValue(state || initialState);
    this.driver.setValue(state || initialState);

    this.setState({ mounted: true });
  };

  goTo = (state, config = {}) => {
    const { config: defaultConfig } = this.props;

    const { type, onStart, onComplete, ref, ...opts } = {
      ...defaultConfig,
      ...config
    };

    const engine = type === 'timing' ? Animated.timing : Animated.spring;

    const animate = toValue =>
      Animated.parallel([
        engine(this.nativeDriver, {
          ...opts,
          toValue,
          useNativeDriver: true
        }),
        engine(this.driver, { ...opts, useNativeDriver: undefined, toValue })
      ]);

    if (Array.isArray(state)) {
      const sequence = [];

      state.forEach(toValue => sequence.push(animate(toValue)));

      this.key = sequence[sequence.length - 1];

      const animationRef = Animated.sequence(sequence);

      if (ref) return animationRef;

      return animationRef.start(animation => {
        if (onStart) onStart();
        if (animation.finished && onComplete) onComplete();
      });
    }

    this.key = state;

    const animationRef = animate(state);

    if (ref) return animationRef;

    return animationRef.start(animation => {
      if (animation.finished && onComplete) onComplete();
    });
  };

  presets = {
    faded: [{ opacity: 0 }, { opacity: 1 }]
  };

  layoutPresets = {
    absolute: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
    centered: { alignSelf: 'center' },
    fixed: { position: 'absolute' },
    full: { flex: 1 },
    landing: { alignItems: 'center', flex: 1, justifyContent: 'center' }
  };

  render() {
    const { mounted } = this.state;

    if (!mounted) return null;

    const {
      absolute,
      centered,
      children,
      clamp,
      config,
      driver,
      faded,
      fixed,
      full,
      initialState,
      keys,
      landing,
      nativeDriver,
      pointerEvents,
      state: _state,
      style,
      unmounted,
      ...rest
    } = this.props;

    let { state } = this.props;

    if (faded) state = this.presets.faded;

    const viewStyles = {
      ...this.layoutPresets[absolute && 'absolute'],
      ...this.layoutPresets[centered && 'centered'],
      ...this.layoutPresets[fixed && 'fixed'],
      ...this.layoutPresets[full && 'full'],
      ...this.layoutPresets[landing && 'landing'],
      ...rest
    };

    const inputRange =
      keys ||
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
      this.nativeDriver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : undefined
      });

    const addProp = (prop, defaultValue) =>
      this.driver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : undefined
      });

    const opacity = addNativeProp('opacity', 1);
    const rotate = addNativeProp('rotate', '0deg');
    const scale = addNativeProp('scale', 1);
    const translateX = addNativeProp('translateX', 0);
    const translateY = addNativeProp('translateY', 0);

    const backgroundColor = addProp('backgroundColor', 'transparent');
    const height = addProp('height', null);
    const width = addProp('width', null);

    const nativeStyles = {
      opacity,
      transform: [{ rotate }, { scale }, { translateX }, { translateY }]
    };

    const styles = { backgroundColor, height, width };

    return (
      <Animated.View
        style={[style, viewStyles, nativeStyles]}
        {...{ pointerEvents }}>
        <Animated.View style={styles}>{children}</Animated.View>
      </Animated.View>
    );
  }
}
