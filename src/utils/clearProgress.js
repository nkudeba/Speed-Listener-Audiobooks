import BackgroundTimer from './BackgroundTimer';

export async function clearProgress(progressTimer) {
  BackgroundTimer.clearInterval(progressTimer);
  // this.progressTimer = false;
  // while (this.progressTimer !== null) {
  //   this.progressTimer = null;
  // }
  console.log('progress CLEARED');
}
