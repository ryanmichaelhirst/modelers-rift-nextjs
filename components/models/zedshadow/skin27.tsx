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
    Fork: THREE.Bone
    Knife: THREE.Bone
    Bib1: THREE.Bone
    L_Shuriken_World: THREE.Bone
    R_Shuriken_World: THREE.Bone
    Root_temp: THREE.Bone
    L_Sword: THREE.Bone
    R_Sword: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Vents: THREE.Bone
    Bug: THREE.Bone
    Healthbar_Buffbone: THREE.Bone
  }
  materials: {
    Shadow_Weapons_Mat: THREE.MeshBasicMaterial
    Silverware_Mat: THREE.MeshBasicMaterial
    Hands_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'zed_skin13_idle1_sh'
  | 'zed_skin13_run'
  | 'zed_skin13_spell1_sh'
  | 'Spell2'
  | 'Spell3'
  | 'zed_skin13_idle_enter_sh'
  | 'zed_skin13_run_in'
  | 'zed_skin13_dance_leadin_sh'
  | 'zed_skin13_dance_sh'
  | 'Taunt_SH'
  | 'Spell4_Strike'
  | 'Dance'
  | 'Taunt'
  | 'Attack_Spell4'
  | 'Spawn'
  | 'Laugh'
  | 'Joke_Loop'
  | 'Joke_Windup'
  | 'zed_skin13_spinningshuriken_sh'
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
        <primitive object={nodes.Fork} />
        <primitive object={nodes.Knife} />
        <primitive object={nodes.Bib1} />
        <primitive object={nodes.L_Shuriken_World} />
        <primitive object={nodes.R_Shuriken_World} />
        <primitive object={nodes.Root_temp} />
        <primitive object={nodes.L_Sword} />
        <primitive object={nodes.R_Sword} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Vents} />
        <primitive object={nodes.Bug} />
        <primitive object={nodes.Healthbar_Buffbone} />
      </group>
      <group position={[-98.3, 0.03, -48.24]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Shadow_Weapons_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Silverware_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Hands_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
