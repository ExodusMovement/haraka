import React from 'react'

import { Animated } from 'react-native'

export default class Behavior extends React.PureComponent {
  static defaultProps = {
    clamp: false,
    clearStyleProps: false,
    config: { type: 'spring' },
    currentState: 0,
    initialState: 0,
    skipProps: [],
    skipStyleProps: [],
    state: [{}, {}],
    style: {},
    styleProps: [],
    unmounted: false
  }

  constructor (props) {
    super(props)

    const { initialState, nativeDriver, driver, unmounted } = this.props

    this.nativeDriver = nativeDriver || new Animated.Value(initialState)
    this.driver = driver || new Animated.Value(initialState)

    this.key = initialState

    this.state = { mounted: !unmounted }
  }

  componentWillReceiveProps (nextProps) {
    const { currentState } = this.props
    const { currentState: nextCurrentState } = nextProps

    if (currentState !== nextCurrentState) {
      this.goTo(nextCurrentState)
    }
  }

  unmount = () => this.setState({ mounted: false })

  mount = state => {
    const { initialState } = this.props

    this.nativeDriver.setValue(state || initialState)
    this.driver.setValue(state || initialState)

    this.setState({ mounted: true })
  }

  goTo = (state, config = {}) => {
    const { config: defaultConfig } = this.props

    const { type, onStart, onComplete, ref, ...opts } = {
      ...defaultConfig,
      ...config
    }

    const engine = type === 'timing' ? Animated.timing : Animated.spring

    const animate = toValue =>
      Animated.parallel([
        engine(this.nativeDriver, {
          ...opts,
          toValue,
          useNativeDriver: true
        }),
        engine(this.driver, { ...opts, useNativeDriver: undefined, toValue })
      ])

    if (Array.isArray(state)) {
      const sequence = []

      state.forEach(toValue => sequence.push(animate(toValue)))

      this.key = sequence[sequence.length - 1]

      const animationRef = Animated.sequence(sequence)

      if (ref) return animationRef

      return animationRef.start(animation => {
        if (onStart) onStart()
        if (animation.finished && onComplete) onComplete()
      })
    }

    this.key = state

    const animationRef = animate(state)

    if (ref) return animationRef

    return animationRef.start(animation => {
      if (animation.finished && onComplete) onComplete()
    })
  }

  handleRef = ref => {
    this.ref = ref
  }

  setNativeProps = props => {
    this.ref.setNativeProps(props)
  }

  render () {
    const { mounted } = this.state

    if (!mounted) return null

    const {
      absolute,
      centered,
      children,
      clamp,
      clearStyleProps,
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
      faded: [{ opacity: 0 }, { opacity: 1 }]
    }

    if (faded) state = presets.faded

    const layoutPresets = {
      absolute: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
      centered: { alignSelf: 'center' },
      fixed: { position: 'absolute' },
      full: { flex: 1 },
      landing: { alignItems: 'center', flex: 1, justifyContent: 'center' }
    }

    const viewStyles = {
      ...layoutPresets[absolute && 'absolute'],
      ...layoutPresets[centered && 'centered'],
      ...layoutPresets[fixed && 'fixed'],
      ...layoutPresets[full && 'full'],
      ...layoutPresets[landing && 'landing']
    }

    const propStyles = Object.keys(rest).reduce((obj, key) => {
      if (skipProps.includes(key)) return obj

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

    const getRange = (prop, defaultValue) =>
      state.reduce((range, currentState, index) => {
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

    const addProp = (prop, defaultValue, native) => {
      const propDriver = native ? this.nativeDriver : this.driver

      return propDriver.interpolate({
        inputRange,
        outputRange: getRange(prop, defaultValue),
        extrapolate: clamp ? 'clamp' : undefined
      })
    }

    const defaultStyleProps = !clearStyleProps
      ? [
        { prop: 'opacity', default: 1, native: true },
        { prop: 'rotate', default: '0deg', native: true, transform: true },
        { prop: 'scale', default: 1, native: true, transform: true },
        { prop: 'translateX', default: 0, native: true, transform: true },
        { prop: 'translateY', default: 0, native: true, transform: true },

        { prop: 'backgroundColor', default: 'transparent' },
        { prop: 'height', default: null },
        { prop: 'width', default: null }
      ]
      : []

    const nativeStyles = {}
    const styles = {}

    const allStyleProps = [...defaultStyleProps, ...styleProps]

    allStyleProps.forEach(
      ({ prop, default: defaultValue, native, transform }) => {
        if (!skipStyleProps.includes(prop)) {
          const stylesRef = native ? nativeStyles : styles

          if (transform) {
            stylesRef.transform = [
              ...(stylesRef.transform || []),
              { [prop]: addProp(prop, defaultValue, native) }
            ]
          } else {
            stylesRef[prop] = addProp(prop, defaultValue, native)
          }
        }
      }
    )

    return (
      <Animated.View
        ref={this.handleRef}
        style={[style, viewStyles, propStyles, nativeStyles]}
        {...{ pointerEvents }}>
        <Animated.View style={styles}>{children}</Animated.View>
      </Animated.View>
    )
  }
}
