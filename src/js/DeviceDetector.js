export default class DeviceDetector {
  /**
   * Naive check if browser is mobile device.
   */
  static isMobile () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
