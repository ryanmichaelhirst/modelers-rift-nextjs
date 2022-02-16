import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    Shadow_Loc: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hat: THREE.MeshBasicMaterial
    Faceshapes: THREE.MeshBasicMaterial
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
        <primitive object={nodes.Shadow_Loc} />
      </group>
      <group position={[-101.47, 68.6, -78.53]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Hat} skeleton={nodes.mesh_0_1.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Faceshapes}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
