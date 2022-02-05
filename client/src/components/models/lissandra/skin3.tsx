import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Q_Spike: THREE.Bone
    CystalBase: THREE.Bone
  }
  materials: {
    Lissandra_Skin03_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Death_Base'
  | 'lissandra_spell2'
  | 'Idle1_Base'
  | 'Attack1'
  | 'Attack2'
  | 'Spell1'
  | 'Spell3'
  | 'Spell4_Self'
  | 'Run_Base'
  | 'Run_In'
  | 'Joke'
  | 'Laugh'
  | 'Run_ICE'
  | 'Crit'
  | 'Spell4'
  | 'Taunt'
  | 'lissandra_dance'
  | 'lissandra_skin03_idle_in'
  | 'lissandra_run3'
  | 'Spell3_Port'
  | 'Run2_In'
  | 'Channel'
  | 'Channel_Wndup'
  | 'lissandra_run2'
  | 'Run_In2'
  | 'Idle2_Base'
  | 'lissandra_skin03_idle3'
  | 'Run3_In'
  | 'Run2_Var'
  | 'Run_Var'
  | 'lissandra_dance_loop'
  | 'Spell2_ICE'
  | 'lissandra_skin03_dance_ice'
  | 'Dance_LOOP_ICE'
  | 'Death_Ice'
  | 'lissandra_taunt'
  | 'Turn_0'
  | 'Turn_L'
  | 'Turn_L180'
  | 'Turn_R'
  | 'Turn_R180'
  | 'Recall'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Q_Spike} />
        <primitive object={nodes.CystalBase} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Lissandra_Skin03_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-62.5, 13.14, -67.39]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
