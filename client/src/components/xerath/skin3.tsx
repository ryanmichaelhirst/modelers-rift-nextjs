import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_CSTM_EXTRA: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_CSTM_ULT1: THREE.Bone
    BUFFBONE_CSTM_ULT2: THREE.Bone
    BUFFBONE_CSTM_ULT3: THREE.Bone
    BUFFBONE_CSTM_ULT4: THREE.Bone
    BUFFBONE_CSTM_ULT5: THREE.Bone
    BUFFBONE_CSTM_ULT6: THREE.Bone
    BUFFBONE_CSTM_ULT7: THREE.Bone
    BUFFBONE_CSTM_ULT8: THREE.Bone
    BUFFBONE_CSTM_CHANNEL_2: THREE.Bone
    BUFFBONE_CSTM_CHANNEL_3: THREE.Bone
  }
  materials: {
    xerath_ironforge_MD_Xerath_M: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Attack3'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Idle4'
  | 'Laugh'
  | 'Run'
  | 'Joke'
  | 'Spell2'
  | 'xerath_ironforge_spell2_channel'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_Base'
  | 'Ironforge_Foot'
  | 'xerath_spell1'
  | 'spell5end'
  | 'Spell5Loop'
  | 'Spell5start'
  | 'xerath_taunt'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_CSTM_EXTRA} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT1} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT2} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT3} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT4} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT5} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT6} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT7} />
        <primitive object={nodes.BUFFBONE_CSTM_ULT8} />
        <primitive object={nodes.BUFFBONE_CSTM_CHANNEL_2} />
        <primitive object={nodes.BUFFBONE_CSTM_CHANNEL_3} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.xerath_ironforge_MD_Xerath_M}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
