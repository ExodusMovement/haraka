import React from 'react'

import { Animated } from 'react-native'

const PRESETS = {
  faded: [{ opacity: 0 }, { opacity: 1 }],
}

const LAYOUT_PRESETS = {
  absolute: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  centered: { alignSelf: 'center' },
  fixed: { position: 'absolute' },
  full: { flex: 1 },
  landing: { alignItems: 'center', flex: 1, justifyContent: 'center' },
}

const PROPS = [
  { prop: 'opacity', default: 1 },
  { prop: 'rotate', default: '0deg', transform: true },
  { prop: 'scale', default: 1, transform: true },
  { prop: 'translateX', default: 0, transform: true },
  { prop: 'translateY', default: 0, transform: true },
]

export default class Behavior extends React.PureComponent {
  ref = React.createRef()

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

    const { initialState, nativeDriver, unmounted } = this.props

    this.nativeDriver = nativeDriver || new Animated.Value(initialState)

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

    if (currentState !== nextCurrentState) {
      this.goTo(nextCurrentState)
    }

    if (!disabled && nextDisabled) {
      this.disable()
    } else if (disabled && !nextDisabled) {
      this.enable()
    }
  }

  mount = (state) => {
    const { initialState } = this.props

    this.nativeDriver.setValue(state || initialState)

    this.setState({ mounted: true })
  }

  unmount = () => {
    this.setState({ mounted: false })
  }

  goTo = (key, config = {}) => {
    const isSequence = Array.isArray(key)

    const { config: defaultConfig, state } = this.props

    const { config: stateConfig = {} } = isSequence ? {} : state[key]

    const { delay, onComplete, ref, type, unmount, ...opts } = {
      ...defaultConfig,
      ...stateConfig,
      ...config,
    }

    const curve = type === 'timing' ? Animated.timing : Animated.spring

    const animate = (toValue) => {
      return curve(this.nativeDriver, {
        ...opts,
        toValue,
        useNativeDriver: true,
      })
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

  setNativeProps = (props) => {
    this.ref.current.setNativeProps(props)
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

    if (faded) {
      state = PRESETS.faded
    }

    const viewStyles = {
      ...LAYOUT_PRESETS[absolute && 'absolute'],
      ...LAYOUT_PRESETS[centered && 'centered'],
      ...LAYOUT_PRESETS[fixed && 'fixed'],
      ...LAYOUT_PRESETS[full && 'full'],
      ...LAYOUT_PRESETS[landing && 'landing'],
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

    const addProp = (prop, defaultValue) => {
      return this.nativeDriver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : undefined,
      })
    }

    const defaultStyleProps = clearStyleProps ? [] : PROPS

    const nativeStyles = {}

    const allStyleProps = [...defaultStyleProps, ...styleProps]

    allStyleProps.forEach(({ prop, default: defaultValue, transform }) => {
      if (!skipStyleProps.includes(prop)) {
        if (transform) {
          nativeStyles.transform = [
            ...(nativeStyles.transform || []),
            { [prop]: addProp(prop, defaultValue) },
          ]
        } else {
          nativeStyles[prop] = addProp(prop, defaultValue)
        }
      }
    })

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        ref={this.ref}
        style={[style, viewStyles, propStyles, nativeStyles]}
      >
        {children}
      </Animated.View>
    )
  }
}
