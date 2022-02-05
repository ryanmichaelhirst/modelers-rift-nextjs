import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Shadow_Loc: THREE.Bone
  }
  materials: {
    Hand: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Spell1'
  | 'Taunt'
  | 'Celebrate'
  | 'idle_var_02'
  | 'Idle_In'
  | 'Joke'
  | 'Interact'
  | 'run_ufo.littlelegends_darkstar'
  | 'idle_var_01'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance'
  | 'Run_Base'
  | 'Cast_Animation'
  | 'Cast_Cycle'
  | 'Damage_Hit'
  | 'hurt'
  | 'Death'
  | 'Into_Cast'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'emote_03'
  | 'emote_01'
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
        <primitive object={nodes.Shadow_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Hand}
        skeleton={nodes.mesh_0.skeleton}
        position={[-98.8, 69.39, -63.1]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
