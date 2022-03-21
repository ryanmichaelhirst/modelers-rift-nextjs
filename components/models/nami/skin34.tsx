import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Water_Large_1: THREE.Bone
    Buffbone_Water_Large_2: THREE.Bone
    Buffbone_Water_Large_3: THREE.Bone
    Buffbone_Water_Large_4: THREE.Bone
    Buffbone_Water_Meduim_1: THREE.Bone
    Buffbone_Water_Meduim_2: THREE.Bone
    Buffbone_Water_Meduim_3: THREE.Bone
    Buffbone_Water_Meduim_4: THREE.Bone
    Buffbone_Water_Meduim_5: THREE.Bone
    Buffbone_Water_Meduim_6: THREE.Bone
    Buffbone_Water_Meduim_7: THREE.Bone
    Buffbone_Water_Meduim_8: THREE.Bone
    Buffbone_Water_Small_1: THREE.Bone
    Buffbone_Water_Small_2: THREE.Bone
    Buffbone_Water_Small_3: THREE.Bone
    Buffbone_Water_Small_4: THREE.Bone
    Buffbone_Water_Small_5: THREE.Bone
    Buffbone_Water_Small_6: THREE.Bone
    Buffbone_Water_Small_7: THREE.Bone
    Buffbone_Water_Small_8: THREE.Bone
    Recall01_Pumpkin1: THREE.Bone
    Recall01_Root: THREE.Bone
    Recall02_Root: THREE.Bone
    Recall03_Pumpkin1: THREE.Bone
    Recall03_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall_Pumpkin: THREE.MeshBasicMaterial
    Recall_Shark: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'nami_attack1.pie_c_10_24'
  | 'nami_attack2.pie_c_10_24'
  | 'Channel_Base'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'Idle1_Base'
  | 'Idle2_Base'
  | 'nami_skin32_idle3.pie_c_11_20'
  | 'Joke'
  | 'Dance'
  | 'Death'
  | 'nami_skin32_laugh.pie_c_11_20'
  | 'Taunt_Base'
  | 'Run_Base'
  | 'nami_spell1.pie_c_10_24'
  | 'nami_spell2.pie_c_10_24'
  | 'Spell3'
  | 'nami_skin32_idle_leadin2.pie_c_11_20'
  | 'nami_skin32_idle_leadin3.pie_c_11_20'
  | 'nami_skin32_idle4.pie_c_11_20'
  | 'Spell4_Base'
  | 'nami_idle1.pie_c_10_24'
  | 'Recall_Winddown'
  | 'nami_recall_windup.pie_c_10_24'
  | 'nami_channel_in.pie_c_10_24'
  | 'nami_idle_leadin4.pie_c_10_24'
  | 'nami_run_l'
  | 'nami_spell4.pie_c_10_24'
  | 'nami_taunt.pie_c_10_24'
  | 'nami_run.pie_c_10_24'
  | 'nami_crit.pie_c_10_24'
  | 'Recall'
  | 'nami_skin24_idleweaponfx.pie_c_10_24'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

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
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Water_Large_1} />
        <primitive object={nodes.Buffbone_Water_Large_2} />
        <primitive object={nodes.Buffbone_Water_Large_3} />
        <primitive object={nodes.Buffbone_Water_Large_4} />
        <primitive object={nodes.Buffbone_Water_Meduim_1} />
        <primitive object={nodes.Buffbone_Water_Meduim_2} />
        <primitive object={nodes.Buffbone_Water_Meduim_3} />
        <primitive object={nodes.Buffbone_Water_Meduim_4} />
        <primitive object={nodes.Buffbone_Water_Meduim_5} />
        <primitive object={nodes.Buffbone_Water_Meduim_6} />
        <primitive object={nodes.Buffbone_Water_Meduim_7} />
        <primitive object={nodes.Buffbone_Water_Meduim_8} />
        <primitive object={nodes.Buffbone_Water_Small_1} />
        <primitive object={nodes.Buffbone_Water_Small_2} />
        <primitive object={nodes.Buffbone_Water_Small_3} />
        <primitive object={nodes.Buffbone_Water_Small_4} />
        <primitive object={nodes.Buffbone_Water_Small_5} />
        <primitive object={nodes.Buffbone_Water_Small_6} />
        <primitive object={nodes.Buffbone_Water_Small_7} />
        <primitive object={nodes.Buffbone_Water_Small_8} />
        <primitive object={nodes.Recall01_Pumpkin1} />
        <primitive object={nodes.Recall01_Root} />
        <primitive object={nodes.Recall02_Root} />
        <primitive object={nodes.Recall03_Pumpkin1} />
        <primitive object={nodes.Recall03_Root} />
      </group>
      <group position={[-136.32, -149.86, -135.93]} scale={0.03}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Pumpkin}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Shark}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
