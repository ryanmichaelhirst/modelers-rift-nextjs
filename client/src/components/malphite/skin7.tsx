import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Malphite_Bilgewater_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'malphite_attack1'
  | 'malphite_attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'malphite_attack3'
  | 'Dance'
  | 'Death'
  | 'malphite_idle1'
  | 'malphite_idle2'
  | 'malphite_idle3'
  | 'Laugh'
  | 'Run'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Spell3'
  | 'Spell1'
  | 'Recall'
  | 'Spell4_LeadOut'
  | 'Cannon_Hold'
  | 'Crit_Low'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Malphite_Bilgewater_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
