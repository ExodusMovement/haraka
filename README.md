# Haraka

[![npm version](https://badge.fury.io/js/haraka.svg)](https://badge.fury.io/js/haraka)

<img src="haraka.svg" alt="Haraka logo" width="128">

You define the behavior states of the component, and then animate between them.

<img src="examples/demos/demo1.gif" width="400">

## Usage

```js
import Behavior from 'haraka';

box = React.createRef();

<Behavior
  ref={this.box}
  state={[
    { backgroundColor: 'gray' }, // state 0
    { backgroundColor: 'green' }, // state 1
    { opacity: 0.5 }, // state 2
    { rotate: '45deg' } // state 3
  ]}
/>;

// ..

this.box.current.goTo(1); // animates box's backgroundColor from gray to green
this.box.current.goTo(2); // animates the opacity of the -now- green box from 1 to 0.5
this.box.current.goTo(3); // rotates the faded green box 45 degrees, starting from 0

this.box.current.goTo([1, 2, 3]); // plays a sequence of behavior states, colorize then fade then tilt
```

## Install

```bash
yarn add haraka
```

## Definition

```js
type behavior = {
  config?: {
    // goTo() default configuration
    type?: 'spring' | 'timing', // default = 'spring'
    onComplete?: func, // to be executed once animation is started
    onComplete?: func, // to be executed once animation is completed
    ref?: bool, // this will return the animation reference instead of playing it immediately
    // can be useful for animating multiple behaviors with `Animated.sequence()` and `Animated.parallel()`
    // `onStart` and `onComplete `are ignored when `ref` is enabled
    ...AnimatedSpringOptions, // excluding toValue, useNativeDriver (see React Native docs)
    ...AnimatedTimingOptions // excluding toValue, useNativeDriver (see React Native docs)
  },
  state?: Array<{
    backgroundColor?: string, // default = 'transparent'
    height?: number, // no percentages, default = null
    opacity?: number, // [0, 1], default = 1
    rotate?: string, // e.g. '45deg', default = '0deg'
    rotateX?: string, // e.g. '45deg', default = '0deg'
    rotateY?: string, // e.g. '45deg', default = '0deg'
    scale?: number, // default = 1
    scaleX?: number, // default = 1
    scaleY?: number, // default = 1
    translateX?: number, // default = 0
    translateY?: number, // default = 0
    width?: number // no percentages, default = null
  }>, // default value is [{}, {}], [{}] can be used for a static behavior
  nativeDriver?: AnimatedValue, // default = new Animated.Value(0), use a custom native driver
  driver?: AnimatedValue, // default = new Animated.Value(0), use a custom driver
  // nativeDriver prop is used for opacity, rotate, scale and translate
  // driver prop is used for backgroundColor, height and width
  children?: any, // the behavior component can enclose other components, can enclose another behavior too
  clamp?: bool, // default = false, prevent animations from exceeding their ranges
  keys?: number[], // can be used with custom drivers to define custom state keys/values
  initialState?: number, // default = 0
  style?: object, // the style of the behavior view, default = {}, AnimatedViewStyle (see React Native docs)
  // animation presets (they populate `state` prop):
  faded?: bool, // , see below for available presets (pass the key)
  // layout presets (they populate `style` prop, you can use multiple):
  absolute?: bool, // see below for available presets (pass the key)
  centered?: bool, // see below for available presets (pass the key)
  fixed?: bool, // see below for available presets (pass the key)
  full?: bool, // see below for available presets (pass the key)
  landing?: bool, // see below for available presets (pass the key)
};

// animation presets
const presets = {
  faded: [{ opacity: 0 }, { opacity: 1 }]
};

// layout presets
const layoutPresets = {
  absolute: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
  centered: { alignSelf: 'center' },
  fixed: { position: 'absolute' },
  full: { flex: 1 },
  landing: { alignItems: 'center', flex: 1, justifyContent: 'center' }
};

// methods
behavior.goTo(index: number | number[], config?: Object = {}) // animate to a specific behavior state

behavior.unmount() // Useful for removing components that are hidden after animation
behavior.mount(state: ?number) // Useful for animations that start in a hidden state, use along with `unmounted` prop and `mount()`

behavior.index // to retrieve current state index
```

## Examples

Available ([here](/examples)).
