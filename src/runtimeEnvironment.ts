
let selectedRuntimeEnvironment = 'unknown';

export const predefinedRuntimeEnvironments = {
  local: 'local',
  production: 'production',
  development: 'development',
};

export function runtimeEnvironment(newRuntimeEnvironment?: string) {
  if (newRuntimeEnvironment) {
    selectedRuntimeEnvironment = newRuntimeEnvironment;
  }
  return selectedRuntimeEnvironment;
}

export function isRunningLocal() {
  return selectedRuntimeEnvironment === predefinedRuntimeEnvironments.local;
}
