import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    runPython_node: THREE.Bone
    Staff_Prop_World: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Candle: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'mini_blue_idle3'
  | 'Idle_In'
  | 'Joke'
  | 'mini_blue_laugh'
  | 'mini_blue_idle2'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Dance_Loop'
  | 'Dance_In'
  | 'RunBase'
  | 'Cast_Animation'
  | 'Into_Cast'
  | 'Cast_Cycle'
  | 'Death'
  | 'mini_damage'
  | 'Interact'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Run_In'
  | 'Greeting'
  | 'Into_Taunt'
  | 'Dive_In'
  | 'Dive_Out'
  | 'dive_to_idle'
  | 'mini_blue_cheer_into_idle'
  | 'Cast_Damage'
  | 'mini_blue_joke'
  | 'mini_blue_taunt_cycle'
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
        <primitive object={nodes.runPython_node} />
        <primitive object={nodes.Staff_Prop_World} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Candle}
        skeleton={nodes.mesh_0.skeleton}
        position={[-74.8, -0.02, -43.7]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
