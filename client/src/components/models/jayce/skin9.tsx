import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
    Root: THREE.Bone
    Weapon: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    Platform: THREE.Bone
    BookRoot: THREE.Bone
  }
  materials: {
    MAT_Jayce: THREE.MeshBasicMaterial
    Jayce_Skin05_Recall_MAT: THREE.MeshBasicMaterial
    Jayce_Skin05_Dummy_MAT: THREE.MeshBasicMaterial
    Jayce_Skin05_Book_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'jayce_melee_idle1'
  | 'jayce_melee_idle2'
  | 'jayce_melee_idle3'
  | 'jayce_laugh'
  | 'Run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'Ranged_Spell1'
  | 'jayce_ranged_spell2_attack2'
  | 'Ranged_Spell3'
  | 'jayce_ranged_spell1'
  | 'Ranged_Attack1'
  | 'Ranged_Attack2'
  | 'jayce_ranged_attack1'
  | 'Run_Fast'
  | 'jayce_ranged_run1'
  | 'jayce_ranged_run2.pie_c_legacy_bugs_2021'
  | 'Ranged_Spell2_Attack1'
  | 'Ranged_Spell2_Attack2'
  | 'Melee_Passive'
  | 'Ranged_Passive'
  | 'jayce_joke'
  | 'jayce_ranged_idle1'
  | 'jayce_ranged_idle2'
  | 'jayce_ranged_idle3'
  | 'jayce_dance_loop_melee.pie_c_legacy_bugs_2021'
  | 'jayce_dance_windup'
  | 'Recall'
  | 'Attack1'
  | 'jayce_taunt'
  | 'jayce_taunt_melee'
  | 'jayce_joke_melee'
  | 'jayce_laugh_melee'
  | 'jayce_dance_windup_range'
  | 'jayce_dance_loop'
  | 'Run_Homeguard_IN'
  | 'jayce_skin05_homeguard'
  | 'jayce_skin05_haste'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

// TODO: this isn't firing atm
const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

// TODO: this needs to only render once
const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.Platform} />
        <primitive object={nodes.BookRoot} />
      </group>
      <group position={[-144.67, -53.35, -147.95]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.MAT_Jayce}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Jayce_Skin05_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Jayce_Skin05_Dummy_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Jayce_Skin05_Book_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
