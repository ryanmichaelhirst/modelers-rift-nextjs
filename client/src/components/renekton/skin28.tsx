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
    mesh_0_3: THREE.SkinnedMesh
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    mesh_0_9: THREE.SkinnedMesh
    mesh_0_10: THREE.SkinnedMesh
    mesh_0_11: THREE.SkinnedMesh
    mesh_0_12: THREE.SkinnedMesh
    mesh_0_13: THREE.SkinnedMesh
    mesh_0_14: THREE.SkinnedMesh
    Root: THREE.Bone
    L_NeckSpike_A: THREE.Bone
    R_NeckSpike_A: THREE.Bone
    L_NeckSpike_B: THREE.Bone
    R_NeckSpike_B: THREE.Bone
    L_NeckSpike_C: THREE.Bone
    L_NeckSpike_D: THREE.Bone
    R_NeckSpike_C: THREE.Bone
    R_NeckSpike_D: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Weapon: THREE.Bone
    Snap_Weapon2World1: THREE.Bone
    Snap_Weapon2World2: THREE.Bone
    Snap_Weapon2World3: THREE.Bone
    ArmGuard: THREE.Bone
    Extra_Module_Root: THREE.Bone
    Extra2_Module_Root: THREE.Bone
  }
  materials: {
    Main: THREE.MeshBasicMaterial
    HelmetOn: THREE.MeshBasicMaterial
    FinsUltimate: THREE.MeshBasicMaterial
    UpperFins: THREE.MeshBasicMaterial
    LowerFins: THREE.MeshBasicMaterial
    Head: THREE.MeshBasicMaterial
    HelmetOff: THREE.MeshBasicMaterial
    JokeBall: THREE.MeshBasicMaterial
    WeaponUltimate: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    Hardlight_Weapon: THREE.MeshBasicMaterial
    Handle: THREE.MeshBasicMaterial
    Armguard: THREE.MeshBasicMaterial
    ExtraModule: THREE.MeshBasicMaterial
    ExtraModule2: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Death'
  | 'Run_Base'
  | 'Spell1'
  | 'Spell2'
  | 'Spell2U'
  | 'Spell3'
  | 'Spell4_Base'
  | 'Idle_In1'
  | 'Run_Homeguard'
  | 'Spell1_ToIdle'
  | 'joke_in.pie_c_11_11'
  | 'joke_loop.pie_c_11_11'
  | 'Spell1_ToRun'
  | 'spell2_weapon.pie_c_11_11'
  | 'spell2_weapon_loop.pie_c_11_11'
  | 'run_noncombat.pie_c_11_11'
  | 'spell4.pie_c_11_11'
  | 'taunt.pie_c_11_11'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string }) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.L_NeckSpike_A} />
        <primitive object={nodes.R_NeckSpike_A} />
        <primitive object={nodes.L_NeckSpike_B} />
        <primitive object={nodes.R_NeckSpike_B} />
        <primitive object={nodes.L_NeckSpike_C} />
        <primitive object={nodes.L_NeckSpike_D} />
        <primitive object={nodes.R_NeckSpike_C} />
        <primitive object={nodes.R_NeckSpike_D} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Snap_Weapon2World1} />
        <primitive object={nodes.Snap_Weapon2World2} />
        <primitive object={nodes.Snap_Weapon2World3} />
        <primitive object={nodes.ArmGuard} />
        <primitive object={nodes.Extra_Module_Root} />
        <primitive object={nodes.Extra2_Module_Root} />
      </group>
      <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Main} skeleton={nodes.mesh_0.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.HelmetOn}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.FinsUltimate}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.UpperFins}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.LowerFins}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_5.geometry} material={materials.Head} skeleton={nodes.mesh_0_5.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_6.geometry}
        material={materials.HelmetOff}
        skeleton={nodes.mesh_0_6.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_7.geometry}
        material={materials.JokeBall}
        skeleton={nodes.mesh_0_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_8.geometry}
        material={materials.WeaponUltimate}
        skeleton={nodes.mesh_0_8.skeleton}
      />
      <skinnedMesh geometry={nodes.mesh_0_9.geometry} material={materials.Weapon} skeleton={nodes.mesh_0_9.skeleton} />
      <skinnedMesh
        geometry={nodes.mesh_0_10.geometry}
        material={materials.Hardlight_Weapon}
        skeleton={nodes.mesh_0_10.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_11.geometry}
        material={materials.Handle}
        skeleton={nodes.mesh_0_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_12.geometry}
        material={materials.Armguard}
        skeleton={nodes.mesh_0_12.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_13.geometry}
        material={materials.ExtraModule}
        skeleton={nodes.mesh_0_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_14.geometry}
        material={materials.ExtraModule2}
        skeleton={nodes.mesh_0_14.skeleton}
      />
    </group>
  )
}
