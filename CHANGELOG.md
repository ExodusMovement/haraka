# 0.0.33

- **Breaking:** Package has been moved to the npm name `@exodus/haraka`, see [#11](../../issues/11).

# 0.0.32

- Support `delay` in animation config.

# 0.0.30

- Support declarative API for state transitions, You can now do this to toggle between states:

```js
<Behavior currentState={0} />
<Behavior currentState={1} />
```

# 0.0.29

- Support `setNativeProps`.

# 0.0.27

- Allow dropping unused style props to enhance performance through `skipStyleProps`.
- Allow adding any type of style props manually through `styleProps`.
- Allow removing all default style props on mount and utilize whatever in `styleProps` only through `clearStyleProps` prop.

```js
const defaultStyleProps = [
  // nativeDriver
  { prop: 'opacity', default: 1, native: true },
  { prop: 'rotate', default: '0deg', native: true, transform: true },
  { prop: 'scale', default: 1, native: true, transform: true },
  { prop: 'translateX', default: 0, native: true, transform: true },
  { prop: 'translateY', default: 0, native: true, transform: true },

  // driver (non-native)
  { prop: 'backgroundColor', default: 'transparent' },
  { prop: 'height', default: null },
  { prop: 'width', default: null },

  ...styleProps, // add yours, or overwrite defaults
]

// if any of these props exist in `skipStyleProps` they will not be used
// and no interpolation values would be created, slightly boosting perf.
```

# 0.0.26

- Support filtering passed props from being included in styles, when using additional props as style overrides, through `skipProps` prop.

# 0.0.25

- **Breaking**: Drop simple gestures recognition. Use a tool like `react-native-gesture-handler` instead.
- **Breaking**: Renamed `indices` prop to `keys`.
- **Breaking**: Use `behavior.key` to retrieve current state index (now named `key`).
- **Breaking**: Drop support for `rotateX`, `rotateY`, `scaleX` and `scaleY` state props, which were introduced only recently, to enhance performance. You can still use them through the `style` prop and a custom driver.
- Add `unmount()` and `mount(state?: number)` methods. Useful for removing components that are hidden after animation.
- Add `onStart` event to `goTo()` options.
- Add `unmounted` prop. Useful for animations that start in a hidden state. Use `mount()` to mount the component first then animate it.

# 0.0.21

- **Breaking**: Project has been renamed to `haraka`. You can continue to use [`react-native-behavior`](https://www.npmjs.com/package/react-native-behavior) if you are already using it in a project (has been stable for over a year), it will not receive any future updates however and has been deprecated.
- **Breaking**: `animatedNativeValue` prop is now `nativeDriver`.
- **Breaking**: `animatedValue` prop is now `driver`.
- **Breaking**: `states` prop is now just `state` (without the s).
- **Breaking**: `mode` option in `goTo()` configuration has been renamed to `type`.
- **Breaking**: `callback` option in `goTo()` configuration has been renamed to `onComplete`.
- State can now be `undefined`, it will not throw if not passed, the default value is `[{}, {}]`. It will still throw however if you pass an empty array `state={[]}` use `state={undefined}` instead if you want to do this.
- State can now be static `state=[{ /* config */ }]` by passing a single state.
- You can now style the behavior view directly from the props (you still have the option to use the `style` prop too), any additional props are passed to the style object of the view, additional props are style overrides.

```js
<Behavior flex={1} />
```

- You can now use an animation or a layout preset from the available presets, see [the definition](../../#definition) for options.
- You can now get the animation reference instead of playing it immediately with the `ref` option in `goTo()` configuration. This can be useful for composing multiple behavior animations with `Animated.sequence` and `Animated.parallel`.
- You can pass a `pointerEvents` prop to the behavior view.
- Used Rollup to bundle the package.

# 0.0.19

- Support rotate and scale native props (`rotateX`, `rotateY`, `scaleX`, `scaleY`).
- Fix `Array.keys()` bug on Android, no need to provide `indices` prop on Android anymore.
- Make the component pure.
