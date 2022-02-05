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
    L_Snap_to_World: THREE.Bone
    R_Snap_to_World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Sack: THREE.Bone
    Chair: THREE.Bone
    Gift1: THREE.Bone
    Gift2: THREE.Bone
    Thin_Root: THREE.Bone
    Fat_Root: THREE.Bone
    Beard: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_BuffBone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Draven_Snowdown_MAT: THREE.MeshBasicMaterial
    Skin12_Recall_MAT: THREE.MeshBasicMaterial
    Penguins_Recall_MAT: THREE.MeshBasicMaterial
    Beard_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'draven_idle2.pie_c_legacy_bugs_10_7'
  | 'draven_idle3.pie_c_legacy_bugs_10_7'
  | 'draven_idle4.pie_c_legacy_bugs_10_7'
  | 'Joke'
  | 'Laugh'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt'
  | 'draven_idle5.pie_c_legacy_bugs_10_7'
  | 'draven_beam_windup.pie_c_legacy_bugs_10_7'
  | 'draven_beam_channel.pie_c_legacy_bugs_10_7'
  | 'draven_skin12_run_arms_out.pie_c_legacy_bugs_10_7'
  | 'Spell1_Rwpn_Off'
  | 'draven_skin12_idle1_botharms.pie_c_legacy_bugs_10_7'
  | 'Idle1_BothArms'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Left'
  | 'draven_run.pie_c_legacy_bugs_10_7'
  | 'Idle1'
  | 'draven_idle1.pie_c_legacy_bugs_10_7'
  | 'Recall'
  | 'Beam_Winddown'
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
        <primitive object={nodes.L_Snap_to_World} />
        <primitive object={nodes.R_Snap_to_World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Sack} />
        <primitive object={nodes.Chair} />
        <primitive object={nodes.Gift1} />
        <primitive object={nodes.Gift2} />
        <primitive object={nodes.Thin_Root} />
        <primitive object={nodes.Fat_Root} />
        <primitive object={nodes.Beard} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_BuffBone_Glb_Overhead_Loc} />
      </group>
      <group position={[-188.77, -18.57, -65.98]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Draven_Snowdown_MAT}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Skin12_Recall_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Penguins_Recall_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Beard_MAT}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
