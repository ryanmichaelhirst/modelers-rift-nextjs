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
    Hook1: THREE.Bone
    C_Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
  }
  materials: {
    Hook: THREE.MeshBasicMaterial
    Death: THREE.MeshBasicMaterial
    Kogmaw: THREE.MeshBasicMaterial
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
  | 'Idle4'
  | 'Joke'
  | 'Laugh'
  | 'Run1'
  | 'RunDead'
  | 'kogmaw_skin08_spell1'
  | 'kogmaw_skin08_spell3'
  | 'Spell4_Base'
  | 'Taunt'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Recall_Leadout'
  | 'kogmaw_skin08_spell4'
  | 'Spell3_Base'
  | 'Run2'
  | 'Run3'
  | 'Turn-90'
  | 'Turn90'
  | 'IdleDead'
  | 'kogmaw_skin08_additiveheadbuffbone'
  | 'kogmaw_skin08_spell2'
  | 'Rumble'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Hook1} />
        <primitive object={nodes.C_Root} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Hook} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_1.geometry} material={materials.Death} skeleton={nodes.mesh_0_1.skeleton} />
      <skinnedMesh geometry={nodes.mesh_0_2.geometry} material={materials.Kogmaw} skeleton={nodes.mesh_0_2.skeleton} />
    </group>
  )
}
