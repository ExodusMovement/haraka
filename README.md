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

More demos available [here](/examples/demos) ([source](/examples)).

# Install

```bash
yarn add haraka
```

# Definition

```js
type behavior = {
  config?: { // goTo() default configuration
    mode?: 'spring' | 'timing', // default = 'spring'
    callback?: Function, // to be executed after animating to a new state
    ...AnimatedSpringOptions, // excluding toValue, useNativeDriver (see React Native docs)
    ...AnimatedTimingOptions // excluding toValue, useNativeDriver (see React Native docs)
  },
  initialState?: number, // default = 0
  state?: Array<{
    backgroundColor?: string, // default = 'transparent'
    height?: number, // no percentages, default = null
    opacity?: number, // [0, 1], default = 1
    rotate?: string, // e.g. '45deg', default = '0deg'
    scale?: number, // default = 1
    translateX?: number, // default = 0
    translateY?: number, // default = 0
    width?: number, // no percentages, default = null
    rotateX?: string, // e.g. '45deg', default = '0deg'
    rotateY?: string, // e.g. '45deg', default = '0deg'
    scaleX?: number, // default = 1
    scaleY?: number, // default = 1
  }>, // default value is [{}, {}]
  style?: Object, // default = {}, AnimatedViewStyle (see React Native docs)
  enableGestures?: boolean, // simple swipe up/down/left/right and pressed/long pressed
  onGesture?: Function, // e.g. gesture => console.log(gesture)
  indices?: Array<number>, // can be used with custom drivers to define custom state keys/values
  clamp?: boolean, // default = false, prevent animations from exceeding their ranges
  swipeVelocityThreshold?: number, // default = 0.3
  swipeDistanceThreshold?: number, // default = 10
  nativeDriver?: AnimatedValue, // default = new Animated.Value(0), use a custom native driver
  driver?: AnimatedValue, // default = new Animated.Value(0), use a custom driver
  // nativeDriver and driver props should be used together, different instances of Animated.Value
  // nativeDriver prop is needed for opacity, rotate, scale and translate
  // driver prop is needed for backgroundColor, height and width
  children?: any // the behavior component can enclose other components, can enclose another behavior too
};

// methods
behavior.goTo(index: number | Array<number>, config?: Object = {}) // animate to a specific behavior state

behavior.index // to retrieve current state index
```
