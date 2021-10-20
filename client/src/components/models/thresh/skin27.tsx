import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Cstm_Buffbone_Portal1: THREE.Bone
    Cstm_Buffbone_Portal2: THREE.Bone
    Cstm_Buffbone_Portal3: THREE.Bone
    Cstm_Buffbone_Portal4: THREE.Bone
    Lantern_Snap_World: THREE.Bone
    Hook_Snap_World: THREE.Bone
    LanternB_Snap_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Hook: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel_Wndup'
  | 'Death'
  | 'Idle1_Base'
  | 'thresh_skin27_run_haste.skins_thresh_skin27'
  | 'thresh_skin27_spell2.skins_thresh_skin27'
  | 'thresh_skin27_attack1_mid.skins_thresh_skin27'
  | 'thresh_skin27_attack1_short.skins_thresh_skin27'
  | 'Channel'
  | 'Crit'
  | 'Dance_Windup'
  | 'Idle2_Base'
  | 'thresh_skin27_idle3.skins_thresh_skin27'
  | 'thresh_skin27_joke.skins_thresh_skin27'
  | 'thresh_skin27_laugh.skins_thresh_skin27'
  | 'thresh_skin27_spell4.skins_thresh_skin27'
  | 'Taunt_Base'
  | 'thresh_skin27_idle_in1.skins_thresh_skin27'
  | 'thresh_skin27_idle_in2.skins_thresh_skin27'
  | 'thresh_skin27_idle4.skins_thresh_skin27'
  | 'Recall_Windup'
  | 'Respawn'
  | 'thresh_skin27_attack1_long.skins_thresh_skin27'
  | 'Spell3_P0'
  | 'thresh_skin27_spell3.skins_thresh_skin27'
  | 'thresh_skin27_spell1_pull1.skins_thresh_skin27'
  | 'thresh_skin27_spell1_in.skins_thresh_skin27'
  | 'Spell1_Grab'
  | 'thresh_skin27_spell1_pull2.skins_thresh_skin27'
  | 'thresh_skin27_spell1_out.skins_thresh_skin27'
  | 'Run_Haste_In'
  | 'Spell1_Dash'
  | 'Attack1_Long_P90'
  | 'Attack1_Long_P-90'
  | 'Attack1_Long_P180'
  | 'Attack1_Long_P-180'
  | 'Run_Base'
  | 'Run_In'
  | 'thresh_skin27_run_fast.skins_thresh_skin27'
  | 'Run_Fast_In'
  | 'Lantern_Open'
  | 'Recall_Loop'
  | 'thresh_taunt2'
  | 'Dance_Loop'
  | 'thresh_skin27_spell3_p-90.skins_thresh_skin27'
  | 'Spell3_P90'
  | 'Spell3_P180'
  | 'thresh_skin27_spell3_p-180.skins_thresh_skin27'
  | 'Lantern_Null'
  | 'thresh_skin27_attack2_mid.skins_thresh_skin27'
  | 'thresh_skin27_attack2_short.skins_thresh_skin27'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Cstm_Buffbone_Portal1} />
        <primitive object={nodes.Cstm_Buffbone_Portal2} />
        <primitive object={nodes.Cstm_Buffbone_Portal3} />
        <primitive object={nodes.Cstm_Buffbone_Portal4} />
        <primitive object={nodes.Lantern_Snap_World} />
        <primitive object={nodes.Hook_Snap_World} />
        <primitive object={nodes.LanternB_Snap_World} />
      </group>
      <group position={[-127.78, -44.56, -90.01]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Hook}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}
