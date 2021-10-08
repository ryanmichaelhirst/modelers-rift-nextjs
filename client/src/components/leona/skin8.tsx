import * as THREE from 'three'
import React, { useRef } from 'react'
import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    shield: THREE.Bone
    Root: THREE.Bone
    Weapon_World: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
  }
  materials: {
    lambert1: THREE.MeshBasicMaterial
    tmp__phong11: THREE.MeshBasicMaterial
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
  | 'Joke'
  | 'Laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2_open'
  | 'leona_skin08_spell2_idle1'
  | 'leona_skin08_spell2_attack1'
  | 'leona_skin08_spell2_run'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'Recall'
  | 'leona_skin08_bones'
  | 'leona_skin08_winddown'
  | 'leona_skin08_respawn'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.shield} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon_World} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.lambert1} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.tmp__phong11}
        skeleton={nodes.mesh_0_1.skeleton}
      />
    </group>
  )
}
