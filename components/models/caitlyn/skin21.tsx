import { AnimatedModelProps } from '@customtypes/index'
import { useAnimations, useGLTF } from '@react-three/drei'
import React, { FC, memo, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Gun_Root: THREE.Bone
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Hat_Loc: THREE.Bone
    Saucer: THREE.Bone
    Teacup: THREE.Bone
  }
  materials: {
    R_Sub: THREE.MeshBasicMaterial
    Caitlyn_Body_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'caitlyn_skin11_attack1'
  | 'caitlyn_skin11_attack2'
  | 'caitlyn_skin11_attack3'
  | 'caitlyn_skin11_attackfast1'
  | 'caitlyn_skin11_attackfast2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit_Base'
  | 'caitlyn_skin11_attackfastcrit'
  | 'caitlyn_skin11_attack4'
  | 'caitlyn_skin11_danceintro'
  | 'caitlyn_skin11_danceloop'
  | 'Death_Base'
  | 'caitlyn_skin11_death'
  | 'Gun_1to6'
  | 'Gun_Active'
  | 'Gun_Active_IN'
  | 'Gun_Overload'
  | 'Gun_Overload_In'
  | 'caitlyn_skin11_gun_active_from_overload'
  | 'caitlyn_skin11_gun_rest_from_overload'
  | 'Gun_QtoActive'
  | 'Gun_Rest'
  | 'Gun_Rest_IN'
  | 'Idle1'
  | 'Idle2'
  | 'caitlyn_skin11_idle3'
  | 'IdleIn'
  | 'IdleIn_Alert'
  | 'caitlyn_skin11_joke'
  | 'Laugh'
  | 'caitlyn_skin11_idle'
  | 'caitlyn_skin11_recall'
  | 'caitlyn_skin11_recall_winddown'
  | 'caitlyn_skin11_run'
  | 'Run_Fast'
  | 'caitlyn_skin11_homeguard'
  | 'caitlyn_skin11_homeguard_in'
  | 'caitlyn_skin11_homeguard_out'
  | 'caitlyn_skin11_spell1'
  | 'Spell2'
  | 'Spell2_Out'
  | 'Spell3'
  | 'caitlyn_skin11_spell3_fallback_out'
  | 'Spell4_Base'
  | 'caitlyn_skin11_spell4'
  | 'Taunt_Base'
  | 'caitlyn_skin11_taunt'
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
        <primitive object={nodes.Gun_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Hat_Loc} />
        <primitive object={nodes.Saucer} />
        <primitive object={nodes.Teacup} />
      </group>
      <group position={[-36.99, -0.6, -34.05]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.R_Sub}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Caitlyn_Body_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
