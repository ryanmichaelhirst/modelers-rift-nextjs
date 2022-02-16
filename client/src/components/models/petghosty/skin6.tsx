import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    R_Hand: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    L_Hand: THREE.Bone
  }
  materials: {
    Pet_Ghosty_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Idle_Base'
  | 'Spell1'
  | 'Taunt'
  | 'ghostie_dance_loop'
  | 'Idle_In'
  | 'Joke'
  | 'ghostie_laugh'
  | 'ghostie_idle_variation'
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
  | 'hurt'
  | 'Interact'
  | 'Run_In'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'ghostie_dance_in'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'ghostie_taunt'
  | 'ghostie_joke'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.R_Hand} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.L_Hand} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Pet_Ghosty_Mat}
        skeleton={nodes.mesh_0.skeleton}
        position={[-87.79, 57.6, -71.66]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
