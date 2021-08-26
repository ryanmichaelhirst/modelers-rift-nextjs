import React, { useEffect, useState } from 'react'

const Champion = ({ champion }: { champion: any }) => {
  const [championInfo, setChampionInfo] = useState({} as any)

  useEffect(() => {
    const data = async () => {
      if (!champion) return

      const req = await fetch(
        `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/${champion.name}.json`,
      ).then((res) => res.json())

      setChampionInfo(req.data[champion.name])
    }

    data()
  }, [champion])

  if (!champion) return null

  return (
    <div className='mt-10 flex-1'>
      <p>{champion.name}</p>
      <p>Base Stats</p>
      <pre>{JSON.stringify(championInfo.stats, null, '\t')}</pre>
    </div>
  )
}

export default Champion
