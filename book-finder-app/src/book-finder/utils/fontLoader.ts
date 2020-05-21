import * as Font from 'expo-font';

export async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'Cardo-Regular': require('../assets/fonts/Cardo-Regular.ttf'),
        'Cardo-Bold': require('../assets/fonts/Cardo-Bold.ttf'),
      }),
    ]);
  }
  
export function handleLoadingError(error) {
  console.warn(error);
}

export function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}