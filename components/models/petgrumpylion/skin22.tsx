import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    Eye: THREE.MeshBasicMaterial
    EarProp: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'kda_idle_in_variant2.littlelegends_10_23'
  | 'RunBase'
  | 'Spell1'
  | 'Taunt'
  | 'Celebrate'
  | 'kda_idle_in_variant.littlelegends_10_23'
  | 'Joke'
  | 'glion_laugh.littlelegends_10_23'
  | 'Idle1'
  | 'Recall'
  | 'Recall_Winddown'
  | 'RunHaste'
  | 'Laugh_Loop'
  | 'Laugh_In'
  | 'kda_idle_into_run.littlelegends_10_23'
  | 'Death'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'RunFlight'
  | 'Interact'
  | 'Cast_Cycle'
  | 'Cast_Animation'
  | 'Into_Cast'
  | 'kda_damage_hurt.littlelegends_10_23'
  | 'Spray'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'glion_laugh_out.littlelegends_10_23'
  | 'Cast_Turn'
  | 'Cast_Damage'
  | 'kda_joke.littlelegends_10_23'
  | 'glion_taunt.littlelegends_10_23'
  | 'Dance_In'
  | 'Dance_Loop'
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
      </group>
      <group position={[-46.84, 0, -64.79]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Eye}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.EarProp}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
