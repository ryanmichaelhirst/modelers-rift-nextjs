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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    mesh_0_6: THREE.SkinnedMesh
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
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    Weapon: THREE.Bone
    Snap_Weapon2World1: THREE.Bone
    Snap_Weapon2World2: THREE.Bone
    Snap_Weapon2World3: THREE.Bone
    ArmGuard: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Extra_Module_Root: THREE.Bone
    Extra2_Module_Root: THREE.Bone
  }
  materials: {
    Main: THREE.MeshBasicMaterial
    FinsUltimate: THREE.MeshBasicMaterial
    UpperFins: THREE.MeshBasicMaterial
    JokeBall: THREE.MeshBasicMaterial
    WeaponUltimate: THREE.MeshBasicMaterial
    Weapon: THREE.MeshBasicMaterial
    ExtraModule: THREE.MeshBasicMaterial
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
        <primitive object={nodes.L_NeckSpike_A} />
        <primitive object={nodes.R_NeckSpike_A} />
        <primitive object={nodes.L_NeckSpike_B} />
        <primitive object={nodes.R_NeckSpike_B} />
        <primitive object={nodes.L_NeckSpike_C} />
        <primitive object={nodes.L_NeckSpike_D} />
        <primitive object={nodes.R_NeckSpike_C} />
        <primitive object={nodes.R_NeckSpike_D} />
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.Weapon} />
        <primitive object={nodes.Snap_Weapon2World1} />
        <primitive object={nodes.Snap_Weapon2World2} />
        <primitive object={nodes.Snap_Weapon2World3} />
        <primitive object={nodes.ArmGuard} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Extra_Module_Root} />
        <primitive object={nodes.Extra2_Module_Root} />
      </group>
      <group position={[-106.87, -46.75, -61.78]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Main}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.FinsUltimate}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.UpperFins}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.JokeBall}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.WeaponUltimate}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Weapon}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.ExtraModule}
          skeleton={nodes.mesh_0_6.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
