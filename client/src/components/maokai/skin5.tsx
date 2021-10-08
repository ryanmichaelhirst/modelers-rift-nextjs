import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    sapling_l_forearm: THREE.Bone
    sapling_l_uparm: THREE.Bone
    sapling_root: THREE.Bone
    sapling_r_uparm: THREE.Bone
    sapling_chest: THREE.Bone
    sapling_head: THREE.Bone
    sapling_hair: THREE.Bone
    sapling_l_knee: THREE.Bone
    sapling_r_forearm: THREE.Bone
    sapling_l_thigh: THREE.Bone
    sapling_r_thigh: THREE.Bone
    sapling_hair_b: THREE.Bone
    sapling_r_knee: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Maokai_Skin05_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'maokai_idle3'
  | 'Joke'
  | 'Laugh'
  | 'Passive'
  | 'Run'
  | 'Spell1'
  | 'maokai_spell2_down'
  | 'Spell2U'
  | 'maokai_spell2_down_idle'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Buffbones'
  | 'Recall'
  | 'Run_To_Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.sapling_l_forearm} />
        <primitive object={nodes.sapling_l_uparm} />
        <primitive object={nodes.sapling_root} />
        <primitive object={nodes.sapling_r_uparm} />
        <primitive object={nodes.sapling_chest} />
        <primitive object={nodes.sapling_head} />
        <primitive object={nodes.sapling_hair} />
        <primitive object={nodes.sapling_l_knee} />
        <primitive object={nodes.sapling_r_forearm} />
        <primitive object={nodes.sapling_l_thigh} />
        <primitive object={nodes.sapling_r_thigh} />
        <primitive object={nodes.sapling_hair_b} />
        <primitive object={nodes.sapling_r_knee} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Maokai_Skin05_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
