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
    Buffbone_Cstm_EyeBallTarget: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    blinn4: THREE.MeshBasicMaterial
    Tentacle: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'velkoz_channel_windup'
  | 'Death_Base'
  | 'Run'
  | 'Recall_Winddown'
  | 'Taunt'
  | 'velkoz_spell2'
  | 'Spell4_In'
  | 'Spell1'
  | 'velkoz_idle1v2'
  | 'Joke'
  | 'Laugh'
  | 'velkoz_spell3'
  | 'Spell4_Base'
  | 'Respawn'
  | 'velkoz_attack1'
  | 'velkoz_attack3'
  | 'velkoz_attack2'
  | 'Dance'
  | 'Recall'
  | 'velkoz_lookaround'
  | 'Spell3_LeadOut'
  | 'Spell4_LeadOut'
  | 'Spell2_LeadOut'
  | 'Run_Haste'
  | 'Crit_Base'
  | 'Turn_Additve_Right'
  | 'Turn_Additve_Left'
  | 'TurnZero_Additive'
  | 'velkoz_idle_in'
  | 'Idle_In_Additive'
  | 'velkoz_crit'
  | 'Spell3_Upper'
  | 'velkoz_spell4_in'
  | 'Recall_Leadout'
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
        <primitive object={nodes.Buffbone_Cstm_EyeBallTarget} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-319, -230.29, -439.91]} scale={0.04}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.blinn4} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Tentacle}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
