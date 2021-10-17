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
    Weapon: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Weapon_World: THREE.Bone
    L_Wing_Upper: THREE.Bone
    R_Wing_Upper: THREE.Bone
    Rock1: THREE.Bone
    Rock2: THREE.Bone
    Rock3: THREE.Bone
    Rock4: THREE.Bone
    Rock5: THREE.Bone
    Rock6: THREE.Bone
  }
  materials: {
    Trundle_Skin06_MAT: THREE.MeshBasicMaterial
    Trundle_Skin06_Wings_MAT: THREE.MeshBasicMaterial
    Trundle_Skin06_Rocks_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'trundle_2013_idle2'
  | 'trundle_2013_idle3'
  | 'trundle_2013_laugh'
  | 'Spell1'
  | 'Spell1A'
  | 'Spell2'
  | 'Spell3'
  | 'trundle_2013_taunt'
  | 'trundle_2013_idle1'
  | 'trundle_2013_idle1_leadin_01'
  | 'Attack1'
  | 'Stun'
  | 'RunHomeguard'
  | 'Recall'
  | 'trundle_2013_run'
  | 'trundle_2013_runalt'
  | 'RunExhaust'
  | 'Joke'
  | '2013_Dance'
  | 'trundle_2013_recall'
  | '2013_Spell4'
  | 'Spell4'
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
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Weapon_World} />
        <primitive object={nodes.L_Wing_Upper} />
        <primitive object={nodes.R_Wing_Upper} />
        <primitive object={nodes.Rock1} />
        <primitive object={nodes.Rock2} />
        <primitive object={nodes.Rock3} />
        <primitive object={nodes.Rock4} />
        <primitive object={nodes.Rock5} />
        <primitive object={nodes.Rock6} />
      </group>
      <group position={[-413.95, -18.77, -111.75]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Trundle_Skin06_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Trundle_Skin06_Wings_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Trundle_Skin06_Rocks_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
