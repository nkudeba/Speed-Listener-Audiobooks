import {clearProgress} from '../../utils/clearProgress';
import {progresstimer} from './MusicPlayer';

export async function clearingProgress() {
  await clearProgress(progresstimer);
}
