import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Snap_Mask: THREE.Bone
    Snap_Sword: THREE.Bone
    RecallFox: THREE.Bone
  }
  materials: {
    Body_MAT: THREE.MeshBasicMaterial
    Fox_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Spell1'
  | 'Spell3'
  | 'masteryi_2013_attack1'
  | 'masteryi_2013_attack2'
  | 'Channel'
  | 'masteryi_2013_crit'
  | 'Death'
  | 'masteryi_2013_idle1'
  | 'masteryi_2013_idle2'
  | 'masteryi_2013_joke'
  | 'masteryi_2013_laugh'
  | 'masteryi_recall'
  | 'Run'
  | 'masteryi_2013_spell2'
  | 'masteryi_2013_taunt'
  | 'masteryi_2013_idle_enter'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'Stun'
  | 'masteryi_2013_passive'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Run_Fast'
  | 'Run_Haste'
  | '2013_Run_Haste'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'Mask'
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
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Snap_Mask} />
        <primitive object={nodes.Snap_Sword} />
        <primitive object={nodes.RecallFox} />
      </group>
      <group position={[-71.82, -0.01, -33.82]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body_MAT} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Fox_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
