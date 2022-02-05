import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    lambert13SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle2'
  | 'Idle3'
  | 'Laugh'
  | 'Spell2U'
  | 'Spell3'
  | 'Taunt'
  | 'Joke'
  | 'Recall'
  | 'Spell2'
  | 'Crit'
  | 'Idle1'
  | 'Recall_Winddown'
  | 'Dance_In'
  | 'Dance_Loop'
  | 'Godfist'
  | 'Respawn'
  | 'leesin_skin11_run1'
  | 'leesin_skin11_run2idle'
  | 'leesin_skin11_spell1'
  | 'Spell1Long'
  | 'Spell1longtrans'
  | 'Spell1mid'
  | 'Spell1midtrans'
  | 'Spell1Short'
  | 'Spell1shorttrans'
  | 'leesin_skin11_spell4a'
  | 'leesin_skin11_spell4b'
  | 'leesin_skin11_spell4c'
  | 'Attack_Lfinish'
  | 'Attack_Rkick'
  | 'leesin_skin11_attack_lpunch'
  | 'leesin_skin11_attack_kick02'
  | 'leesin_skin11_attack_rpunch'
  | 'leesin_skin11_run2runb'
  | 'RunB'
  | 'leesin_skin11_runbtorun'
  | 'Run_Homeguard'
  | 'Spell1_Upper'
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
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert13SG1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-45.88, -0.3, -17.08]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
