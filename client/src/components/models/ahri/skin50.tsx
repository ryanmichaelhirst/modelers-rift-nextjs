import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    c_buffbone_glb_center_loc: THREE.Bone
    R_Arm_Socket: THREE.Bone
    L_Arm_Socket: THREE.Bone
    L_TailD1_Grnd: THREE.Bone
    L_TailC1_Grnd: THREE.Bone
    L_TailB1_Grnd: THREE.Bone
    L_TailA1_Grnd: THREE.Bone
    C_Tail1_Grnd: THREE.Bone
    R_TailA1_Grnd: THREE.Bone
    R_TailC1_Grnd: THREE.Bone
    R_TailD1_Grnd: THREE.Bone
    weapon: THREE.Bone
    buffbone_glb_channel_loc: THREE.Bone
    c_buffbone_glb_overhead_loc: THREE.Bone
    c_buffbone_glb_layout_loc: THREE.Bone
    buffbone_glb_ground_loc: THREE.Bone
    Weapon_Oriented: THREE.Bone
    True_World: THREE.Bone
    buffbone_glb_healthbar_loc: THREE.Bone
    R_TailB1_Grnd: THREE.Bone
    Recall_Skull_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Tail: THREE.MeshBasicMaterial
    Recall_Skull: THREE.MeshBasicMaterial
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
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Dance'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
  | 'Recall_Extended'
  | 'Run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.c_buffbone_glb_center_loc} />
        <primitive object={nodes.R_Arm_Socket} />
        <primitive object={nodes.L_Arm_Socket} />
        <primitive object={nodes.L_TailD1_Grnd} />
        <primitive object={nodes.L_TailC1_Grnd} />
        <primitive object={nodes.L_TailB1_Grnd} />
        <primitive object={nodes.L_TailA1_Grnd} />
        <primitive object={nodes.C_Tail1_Grnd} />
        <primitive object={nodes.R_TailA1_Grnd} />
        <primitive object={nodes.R_TailC1_Grnd} />
        <primitive object={nodes.R_TailD1_Grnd} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.buffbone_glb_channel_loc} />
        <primitive object={nodes.c_buffbone_glb_overhead_loc} />
        <primitive object={nodes.c_buffbone_glb_layout_loc} />
        <primitive object={nodes.buffbone_glb_ground_loc} />
        <primitive object={nodes.Weapon_Oriented} />
        <primitive object={nodes.True_World} />
        <primitive object={nodes.buffbone_glb_healthbar_loc} />
        <primitive object={nodes.R_TailB1_Grnd} />
        <primitive object={nodes.Recall_Skull_Root} />
      </group>
      <group position={[-126.29, -0.41, -115.83]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tail}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Skull}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
