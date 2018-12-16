import React from 'react'

import { Animated } from 'react-native'

export default class Behavior extends React.PureComponent {
  static defaultProps = {
    clamp: false,
    clearStyleProps: false,
    config: { type: 'spring' },
    currentState: 0,
    disabled: false,
    initialState: 0,
    skipProps: [],
    skipStyleProps: [],
    state: [{}, {}],
    style: {},
    styleProps: [],
    unmounted: false,
  }

  constructor(props) {
    super(props)

    const { driver, initialState, nativeDriver, unmounted } = this.props

    this.nativeDriver = nativeDriver || new Animated.Value(initialState)
    this.driver = driver || new Animated.Value(initialState)

    this.key = initialState

    this.state = {
      mounted: !unmounted,
    }
  }

  componentDidMount() {
    const { disabled } = this.props

    if (disabled) {
      this.disable()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentState, disabled } = this.props
    const { currentState: nextCurrentState, disabled: nextDisabled } = nextProps

    // Declarative API
    if (currentState !== nextCurrentState) {
      this.goTo(nextCurrentState)
    }

    if (!disabled && nextDisabled) {
      this.disable()
    }

    if (disabled && !nextDisabled) {
      this.enable()
    }
  }

  mount = (state) => {
    const { initialState } = this.props

    this.nativeDriver.setValue(state || initialState)
    this.driver.setValue(state || initialState)

    this.setState({ mounted: true })
  }

  unmount = () => {
    this.setState({ mounted: false })
  }

  goTo = (key, config = {}) => {
    const isSequence = Array.isArray(key)

    const { config: defaultConfig, state } = this.props

    const { config: stateConfig = {} } = isSequence ? {} : state[key]

    const { type, onComplete, ref, delay, unmount, ...opts } = {
      ...defaultConfig,
      ...stateConfig,
      ...config,
    }

    const curve = type === 'timing' ? Animated.timing : Animated.spring

    const animate = (toValue) => {
      return Animated.parallel([
        curve(this.nativeDriver, {
          ...opts,
          toValue,
          useNativeDriver: true,
        }),
        curve(this.driver, {
          ...opts,
          toValue,
          useNativeDriver: false,
        }),
      ])
    }

    if (isSequence) {
      const sequence = []

      key.forEach((toValue) => sequence.push(animate(toValue)))

      this.key = sequence[sequence.length - 1]

      let animationRef = Animated.sequence(sequence)

      if (delay) {
        animationRef = Animated.sequence([Animated.delay(delay), animationRef])
      }

      if (ref) {
        return animationRef
      }

      return animationRef.start((animation) => {
        if (animation.finished) {
          if (unmount) this.unmount()
          if (onComplete) onComplete()
        }
      })
    }

    this.key = key

    let animationRef = animate(key)

    if (delay) {
      animationRef = Animated.sequence([Animated.delay(delay), animationRef])
    }

    if (ref) {
      return animationRef
    }

    return animationRef.start((animation) => {
      if (animation.finished) {
        if (unmount) this.unmount()
        if (onComplete) onComplete()
      }
    })
  }

  handleRef = (ref) => {
    this.ref = ref
  }

  setNativeProps = (props) => {
    this.ref.setNativeProps(props)
  }

  disable = () => {
    this.setNativeProps({ pointerEvents: 'none' })
  }

  enable = () => {
    this.setNativeProps({ pointerEvents: 'auto' })
  }

  render() {
    const { mounted } = this.state

    if (!mounted) {
      return null
    }

    const {
      absolute,
      centered,
      children,
      clamp,
      clearStyleProps,
      config,
      disabled,
      driver,
      faded,
      fixed,
      full,
      initialState,
      keys,
      landing,
      nativeDriver,
      pointerEvents,
      skipProps,
      skipStyleProps,
      state: _state,
      style,
      styleProps,
      unmounted,
      ...rest
    } = this.props

    let { state } = this.props

    const presets = {
      faded: [{ opacity: 0 }, { opacity: 1 }],
    }

    if (faded) {
      state = presets.faded
    }

    const layoutPresets = {
      absolute: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
      centered: { alignSelf: 'center' },
      fixed: { position: 'absolute' },
      full: { flex: 1 },
      landing: { alignItems: 'center', flex: 1, justifyContent: 'center' },
    }

    const viewStyles = {
      ...layoutPresets[absolute && 'absolute'],
      ...layoutPresets[centered && 'centered'],
      ...layoutPresets[fixed && 'fixed'],
      ...layoutPresets[full && 'full'],
      ...layoutPresets[landing && 'landing'],
    }

    const propStyles = Object.keys(rest).reduce((obj, key) => {
      if (skipProps.includes(key)) {
        return obj
      }

      return { ...obj, [key]: rest[key] }
    }, {})

    const inputRange =
      keys ||
      Array(state.length)
        .fill()
        .map((_, index) => index)

    if (inputRange.length === 1) {
      inputRange.push(1)
      state.push({})
    }

    const getRange = (prop, defaultValue) => {
      return state.reduce((range, currentState, index) => {
        const prevState = range[index - 1]

        range.push(
          currentState[prop] || currentState[prop] === 0
            ? currentState[prop]
            : prevState || prevState === 0
              ? prevState
              : style[prop] || style[prop] === 0
                ? style[prop]
                : defaultValue
        )

        return range
      }, [])
    }

    const addProp = (prop, defaultValue, native) => {
      const propDriver = native ? this.nativeDriver : this.driver

      return propDriver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : undefined,
      })
    }

    const defaultStyleProps = clearStyleProps
      ? []
      : [
          { prop: 'opacity', default: 1, native: true },
          { prop: 'rotate', default: '0deg', native: true, transform: true },
          { prop: 'scale', default: 1, native: true, transform: true },
          { prop: 'translateX', default: 0, native: true, transform: true },
          { prop: 'translateY', default: 0, native: true, transform: true },

          { prop: 'backgroundColor', default: 'transparent' },
          { prop: 'height', default: null },
          { prop: 'width', default: null },
        ]

    const nativeStyles = {}
    const styles = {}

    const allStyleProps = [...defaultStyleProps, ...styleProps]

    allStyleProps.forEach(({ prop, default: defaultValue, native, transform }) => {
      if (!skipStyleProps.includes(prop)) {
        const stylesRef = native ? nativeStyles : styles

        if (transform) {
          stylesRef.transform = [
            ...(stylesRef.transform || []),
            { [prop]: addProp(prop, defaultValue, native) },
          ]
        } else {
          stylesRef[prop] = addProp(prop, defaultValue, native)
        }
      }
    })

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        ref={this.handleRef}
        style={[style, viewStyles, propStyles, nativeStyles]}
      >
        <Animated.View style={styles}>{children}</Animated.View>
      </Animated.View>
    )
  }
}
