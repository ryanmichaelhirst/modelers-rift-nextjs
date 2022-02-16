import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_R_Gem2World: THREE.Bone
    Snap_L_Gem2World: THREE.Bone
  }
  materials: {
    Taric: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Taunt'
  | 'taric_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4_Idle'
  | 'taric_joke_1_start'
  | 'taric_gems_idle'
  | 'Attack3'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'taric_run_to_idle'
  | 'Spell3_Run_0'
  | 'Spell3_Run_-90'
  | 'Spell3_Run_90'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_Run_180'
  | 'Spell3_Run_-180'
  | 'Passive_Attack1'
  | 'Passive_Attack2'
  | 'Idle2_Base'
  | 'taric_recall'
  | 'Turn_-180'
  | 'Turn_180'
  | 'Turn_-90'
  | 'Turn_90'
  | 'taric_respawn'
  | 'Turn_0'
  | 'Joke_2'
  | 'Joke_3'
  | 'taric_joke_4_end'
  | 'Dance_Loop'
  | 'Run_Homeguard'
  | 'Spell4_Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_R_Gem2World} />
        <primitive object={nodes.Snap_L_Gem2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Taric}
        skeleton={nodes.mesh_0.skeleton}
        position={[-168.19, -0.09, -137.3]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
