# 0.0.20

- **Breaking**: Project has been renamed to `haraka`.
- **Breaking**: `animatedNativeValue` and `animatedValue` props are now `nativeDriver` and `driver`.
- **Breaking**: `states` props is now just `state`.
- Use Rollup to bundle the package.

# 0.0.19

- Support rotate and scale native props (`rotateX`, `rotateY`, `scaleX`, `scaleY`).
- Fix `Array.keys()` bug on Android, no need to provide `indices` prop on Android anymore.
- Make the component pure.
