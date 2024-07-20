
let selectedRuntimeEnvironment = 'unknown';

/**
 * Constants of commonly used runtime environments, primarily for use with {@link runtimeEnvironment}.
 *
 * @see {@link runtimeEnvironment}
 * @see {@link isRunningLocal}
 */
export const predefinedRuntimeEnvironments = {
  local: 'local',
  production: 'production',
  development: 'development',
  unknown: 'unknown',
};

/**
 * Represents the current runtime environment, either setting it if a value is provided or
 * returning it if no value is provided. There is no automatic determination of the runtime
 * environment, it must be set, or `unknown` is returned.
 *
 * @example
 *
 * runtimeEnvironment(predefinedRuntimeEnvironments.local);
 * expect(runtimeEnvironment()).toBe('local');
 */
export function runtimeEnvironment(newRuntimeEnvironment?: string) {
  if (newRuntimeEnvironment) {
    selectedRuntimeEnvironment = newRuntimeEnvironment;
  }
  return selectedRuntimeEnvironment;
}

/**
 * Helper to identify if the runtime environment has been set to `local`.
 *
 * @see {@link runtimeEnvironment}
 * @see {@link predefinedRuntimeEnvironments}
 */
export function isRunningLocal() {
  return selectedRuntimeEnvironment === predefinedRuntimeEnvironments.local;
}
