import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    taill1_a: THREE.Bone
    taill2_a: THREE.Bone
    taill3_a: THREE.Bone
    taill4_a: THREE.Bone
    tailr2_a: THREE.Bone
    tailr3_a: THREE.Bone
    tailr4_a: THREE.Bone
    tail_a: THREE.Bone
    Root: THREE.Bone
    tailr1_a: THREE.Bone
    Arcade: THREE.Bone
    l_thigh: THREE.Bone
    r_thigh: THREE.Bone
    weapon: THREE.Bone
    buffbone_glb_channel_loc: THREE.Bone
    buffbone_glb_ground_loc: THREE.Bone
    c_buffbone_glb_center_loc: THREE.Bone
    c_buffbone_glb_layout_loc: THREE.Bone
    c_buffbone_glb_overhead_loc: THREE.Bone
  }
  materials: {
    Skin07_Tails: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
    Ahri_Skin07_Mat: THREE.MeshBasicMaterial
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
  | 'Dance'
  | 'Turn_L'
  | 'Turn_R'
  | 'Turn_0'
  | 'Turn_L180'
  | 'Turn_R180'
  | 'Recall'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.taill1_a} />
        <primitive object={nodes.taill2_a} />
        <primitive object={nodes.taill3_a} />
        <primitive object={nodes.taill4_a} />
        <primitive object={nodes.tailr2_a} />
        <primitive object={nodes.tailr3_a} />
        <primitive object={nodes.tailr4_a} />
        <primitive object={nodes.tail_a} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.tailr1_a} />
        <primitive object={nodes.Arcade} />
        <primitive object={nodes.l_thigh} />
        <primitive object={nodes.r_thigh} />
        <primitive object={nodes.weapon} />
        <primitive object={nodes.buffbone_glb_channel_loc} />
        <primitive object={nodes.buffbone_glb_ground_loc} />
        <primitive object={nodes.c_buffbone_glb_center_loc} />
        <primitive object={nodes.c_buffbone_glb_layout_loc} />
        <primitive object={nodes.c_buffbone_glb_overhead_loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Skin07_Tails}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Recall} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Ahri_Skin07_Mat}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
