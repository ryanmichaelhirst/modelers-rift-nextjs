class SoundService {
  constructor() {}

  formatVoiceLineFileName = ({ cdir, soundDir }: { cdir: string; soundDir: string }) => {
    const champName = cdir.charAt(0).toUpperCase() + cdir.substring(1, cdir.length)
    // converts 'Play_vo_ZyraSkin16_ZyraBasicAttack_cast3D' --> 'basic_attack_cast'
    // remove 'Play_vo_Zyra', 'SkinXX', and '3D' or '2D' or '_'

    var champRegex = new RegExp(champName, 'g')

    return soundDir
      .replace(`Play_vo_`, '')
      .replace(champRegex, '')
      .replace(/Skin\d+/, '')
      .replace(/3D|2D|_/g, '')
      .replace(/[A-Z]/g, (letter, index) =>
        index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase(),
      )
  }
}

export const soundService = new SoundService()
