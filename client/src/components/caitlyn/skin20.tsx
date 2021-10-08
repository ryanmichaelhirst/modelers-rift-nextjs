import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_Buffbone_Glb_Healthbar_Loc: THREE.Bone
    recall_skin19_yasuo2: THREE.Bone
    recall_skin19_yasuo: THREE.Bone
    recall_skin19_teemo: THREE.Bone
    recall_skin19_target: THREE.Bone
    recall_skin19_screen: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_Weap_barrel2World: THREE.Bone
    Snap_WeaponTip2World: THREE.Bone
  }
  materials: {
    Caitlyn_Skin20_TX_MAT: THREE.MeshBasicMaterial
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
  | 'Idle1'
  | 'Idle2'
  | 'Idle3'
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Passive'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell3B'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'Idle_In'
  | 'Recall_Winddown'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.recall_skin19_yasuo2} />
        <primitive object={nodes.recall_skin19_yasuo} />
        <primitive object={nodes.recall_skin19_teemo} />
        <primitive object={nodes.recall_skin19_target} />
        <primitive object={nodes.recall_skin19_screen} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_Weap_barrel2World} />
        <primitive object={nodes.Snap_WeaponTip2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Caitlyn_Skin20_TX_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
