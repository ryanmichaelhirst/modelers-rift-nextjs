import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Scar_Root: THREE.Bone
    Patch_Root: THREE.Bone
    Root: THREE.Bone
    Snap_RWeapon2World: THREE.Bone
    Snap_LWeapon2World: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Healthbar: THREE.Bone
  }
  materials: {
    Skin15_Fairy: THREE.MeshBasicMaterial
    MissFortune_Skin15_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Death'
  | 'Idle1_Base'
  | 'missfortune_idle3'
  | 'Joke'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4_Windup'
  | 'Taunt'
  | 'missfortune_skin15_spell4_to_idle'
  | 'Idle_In'
  | 'Idle2_Base'
  | 'Spell4_Loop'
  | 'Recall'
  | 'Idle1_Alt'
  | 'Idle1_AltIn'
  | 'Run_HomeguardIn'
  | 'Run_HomeguardOut'
  | 'Run_HomeguardVarient'
  | 'missfortune_skin15_run_homeguard'
  | 'missfortune_skin15_recall'
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Run'
  | 'Run2'
  | 'Spell1'
  | 'Spell2'
  | 'Recall_Winddown'
  | 'Respawn'
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
        <primitive object={nodes.Scar_Root} />
        <primitive object={nodes.Patch_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_RWeapon2World} />
        <primitive object={nodes.Snap_LWeapon2World} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Healthbar} />
      </group>
      <group position={[-48.83, 0.57, -61.78]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Skin15_Fairy}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.MissFortune_Skin15_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
