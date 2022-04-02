import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    runPython_Node: THREE.Bone
    PlanetBusta: THREE.Bone
  }
  materials: {
    Base_MAT: THREE.MeshBasicMaterial
    Eyes: THREE.MeshBasicMaterial
    Planet1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'Idle_In'
  | 'Joke'
  | 'sword_interact.littlelegends_darkstar'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Run_Base'
  | 'Cast_Cycle'
  | 'sword_damage.littlelegends_darkstar'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'sword_cast.littlelegends_darkstar'
  | 'sword_idle_alt.littlelegends_darkstar'
  | 'sword_idle_alt2.littlelegends_darkstar'
  | 'sword_idle_alt3.littlelegends_darkstar'
  | 'RunIn'
  | 'Into_Cast'
  | 'sword_castalt.littlelegends_darkstar'
  | 'Dance_Intro'
  | 'Dance_Loop'
  | 'Death_Intro'
  | 'Death_Loop'
  | 'sword_interact2.littlelegends_darkstar'
  | 'sword_interact3.littlelegends_darkstar'
  | 'swordg_taunt.littlelegends_darkstar'
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
        <primitive object={nodes.runPython_Node} />
        <primitive object={nodes.PlanetBusta} />
      </group>
      <group position={[-42.34, -6.05, -57.63]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Base_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Eyes}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Planet1}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
