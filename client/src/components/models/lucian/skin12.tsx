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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Healthbar_Loc: THREE.Bone
    Tree_Main: THREE.Bone
    GunchuckBlur: THREE.Bone
    Recall_Gunchuck_Main: THREE.Bone
  }
  materials: {
    Lucian_Skin09_Body_Mat: THREE.MeshBasicMaterial
    Lucian_Skin09_Trees_Mat: THREE.MeshBasicMaterial
    Lucian_Skin09_BlurPlane_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'Idle1_Base'
  | 'lucian_joke'
  | 'lucian_skin09_laugh'
  | 'Taunt_Base'
  | 'Recall_Windup'
  | 'Idle2_Base'
  | 'lucian_skin09_idle3'
  | 'Attack1_Fast'
  | 'Attack2_Fast'
  | 'lucian_run1'
  | 'Crit2'
  | 'Run1_In'
  | 'lucian_skin09_idle_in'
  | 'Idle_Ready'
  | 'Idle_ReadyOut'
  | 'Spell3'
  | 'Run_Haste'
  | 'Spell4_0'
  | 'Spell4_90'
  | 'Spell4_-90'
  | 'Spell3_0'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_90'
  | 'Spell3_-90'
  | 'Dance'
  | 'Crit1_Fast'
  | 'Crit2_Fast'
  | 'Spell4_180'
  | 'Spell4_-180'
  | 'lucian_spell3'
  | 'Spell4_Arms'
  | 'Spell4_Idle_0'
  | 'Spell4_Idle_180'
  | 'Spell4_Idle_-180'
  | 'Spell4_Idle_90'
  | 'Spell4_Idle_-90'
  | 'lucian_spell4_arms'
  | 'Spell2_0'
  | 'Spell2_180'
  | 'Spell2_-180'
  | 'Spell2_90'
  | 'Spell2_-90'
  | 'lucian_passive'
  | 'lucian_skin09_run2'
  | 'Run2_In'
  | 'Passive_180'
  | 'Passive_-180'
  | 'Passive_90'
  | 'Passive_-90'
  | 'Buffbones'
  | 'lucian_skin09_passive_crit'
  | 'Passive_Override'
  | 'Spell1'
  | 'lucian_skin09_taunt'
  | 'lucian_skin09_idle1'
  | 'lucian_npe_spawn'
  | 'Recall'
  | 'lucian_skin09_recall_winddown'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Healthbar_Loc} />
        <primitive object={nodes.Tree_Main} />
        <primitive object={nodes.GunchuckBlur} />
        <primitive object={nodes.Recall_Gunchuck_Main} />
      </group>
      <group position={[-233.15, -79.02, -105.41]} scale={0.03}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Lucian_Skin09_Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Lucian_Skin09_Trees_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Lucian_Skin09_BlurPlane_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
