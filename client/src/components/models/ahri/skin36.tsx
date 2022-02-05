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
    C_Tail1_Grnd: THREE.Bone
    R_TailB1_Grnd: THREE.Bone
    R_TailC1_Grnd: THREE.Bone
    R_TailD1_Grnd: THREE.Bone
    weapon: THREE.Bone
    buffbone_glb_channel_loc: THREE.Bone
    c_buffbone_glb_overhead_loc: THREE.Bone
    c_buffbone_glb_layout_loc: THREE.Bone
    buffbone_glb_ground_loc: THREE.Bone
    Stairs: THREE.Bone
    Throne: THREE.Bone
    Weapon_Oriented: THREE.Bone
    R_TailA1_Grnd: THREE.Bone
    L_TailA1_Grnd: THREE.Bone
    L_TailB1_Grnd: THREE.Bone
    L_TailC1_Grnd: THREE.Bone
    L_TailD1_Grnd: THREE.Bone
    L_Arm_Socket: THREE.Bone
    R_Arm_Socket: THREE.Bone
    c_buffbone_glb_center_loc: THREE.Bone
    buffbone_glb_healthbar_loc: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Tails: THREE.MeshBasicMaterial
    Stairs: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Idle5'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance_Intro'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
  | 'Recall_Extended'
  | 'Dance_Loop'
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
        <primitive object={nodes.C_Tail1_Grnd} />
        <primitive object={nodes.R_TailB1_Grnd} />
        <primitive object={nodes.R_TailC1_Grnd} />
        <primitive object={nodes.R_TailD1_Grnd} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.buffbone_glb_channel_loc} />
        <primitive object={nodes.c_buffbone_glb_overhead_loc} />
        <primitive object={nodes.c_buffbone_glb_layout_loc} />
        <primitive object={nodes.buffbone_glb_ground_loc} />
        <primitive object={nodes.Stairs} />
        <primitive object={nodes.Throne} />
        <primitive object={nodes.Weapon_Oriented} />
        <primitive object={nodes.R_TailA1_Grnd} />
        <primitive object={nodes.L_TailA1_Grnd} />
        <primitive object={nodes.L_TailB1_Grnd} />
        <primitive object={nodes.L_TailC1_Grnd} />
        <primitive object={nodes.L_TailD1_Grnd} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.c_buffbone_glb_center_loc} />
        <primitive object={nodes.buffbone_glb_healthbar_loc} />
        <primitive object={nodes.True_World} />
      </group>
      <group position={[-123.26, -9.76, -109.5]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tails}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Stairs}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
