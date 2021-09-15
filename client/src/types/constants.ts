export const STAT_OPTIONS = [
  { label: 'Attack Damage', value: 'attackdamage' },
  { label: 'Armor', value: 'armor' },
  { label: 'Magic Resist', value: 'spellblock' },
  { label: 'Health', value: 'hp' },
  { label: 'Mana', value: 'mp' },
  { label: 'Health Regen', value: 'hpregen' },
  { label: 'Mana Regen', value: 'mpregen' },
  { label: 'Crit', value: 'crit' },
  { label: 'Attack Speed', value: 'attackspeed' },
]

export const STAT_SEMANTIC_TEMPLATES = {
  '<physicalDamage>': 'Physical Damage',
  '<magicDamage>': 'Magic Damage',
  '<status>': 'Status',
  '<recast>': 'Recast',
  '<lifeSteal>': 'Life Steal',
  '<spellPassive>': 'Passive',
  '<spellActive>': 'Active',
  '<scaleAD>': 'Scale AD',
  '<healing>': 'Healing',
  '<speed>': 'Speed',
  '<keywordStealth>': 'Stealth',
}
