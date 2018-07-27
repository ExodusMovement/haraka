# 0.0.20

- **Breaking**: Project has been renamed to `haraka`.
- **Breaking**: `animatedNativeValue` and `animatedValue` props are now `nativeDriver` and `driver`.
- **Breaking**: `states` props is now just `state`.

- You can now style the behavior view directly from the props (you still have the option to use the `style` prop too), any additional props are passed to the style object of the view, additional props are style overrides.

```js
<Behavior top={200} left={100} />
```

- Use Rollup to bundle the package.

# 0.0.19

- Support rotate and scale native props (`rotateX`, `rotateY`, `scaleX`, `scaleY`).
- Fix `Array.keys()` bug on Android, no need to provide `indices` prop on Android anymore.
- Make the component pure.
