import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    ROOT: THREE.Bone
    L_claw_1_FK: THREE.Bone
    L_claw_2_FK: THREE.Bone
    L_claw_3_FK: THREE.Bone
    ROOT_FK: THREE.Bone
    R_claw_1_FK: THREE.Bone
    R_claw_2_FK: THREE.Bone
    R_claw_3_FK: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_WEAPON_1: THREE.Bone
    C_BUFFBONE_GLB_CHEST_LOC: THREE.Bone
    C_BUFFBONE_GLB_HEAD_LOC: THREE.Bone
    L_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    L_BUFFBONE_GLB_HAND_LOC: THREE.Bone
    R_BUFFBONE_GLB_FOOT_LOC: THREE.Bone
    R_BUFFBONE_GLB_HAND_LOC: THREE.Bone
  }
  materials: {
    lambert2SG1: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
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
        <primitive object={nodes.ROOT} />
        <primitive object={nodes.L_claw_1_FK} />
        <primitive object={nodes.L_claw_2_FK} />
        <primitive object={nodes.L_claw_3_FK} />
        <primitive object={nodes.ROOT_FK} />
        <primitive object={nodes.R_claw_1_FK} />
        <primitive object={nodes.R_claw_2_FK} />
        <primitive object={nodes.R_claw_3_FK} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_WEAPON_1} />
        <primitive object={nodes.C_BUFFBONE_GLB_CHEST_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_HEAD_LOC} />
        <primitive object={nodes.L_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.L_BUFFBONE_GLB_HAND_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_FOOT_LOC} />
        <primitive object={nodes.R_BUFFBONE_GLB_HAND_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert2SG1}
        skeleton={nodes.mesh_0.skeleton}
        position={[-69.23, -11.65, -51.36]}
        scale={0.01}
      />
    </group>
  )
}
