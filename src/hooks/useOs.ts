export enum OsType {
  Linux = "Linux",
  macOs = "macOS",
  Windows = "Windows",
  Unknown = "Unknown",
}

export function useOs(): { current: OsType } {
  const getOS = () => {
    const userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ["macOS", "Macintosh", "MacIntel", "MacPPC", "Mac68K"],
      windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];

    let os = OsType.Unknown;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = OsType.macOs;
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = OsType.Windows;
    } else if (/Linux/.test(platform)) {
      os = OsType.Linux;
    } else {
    }

    return os;
  };

  return {
    current: getOS(),
  };
}
