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
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Weapon2World: THREE.Bone
    Recall_Props_World: THREE.Bone
    Recall_Props_Buffbone1: THREE.Bone
    Recall_Props_Buffbone3: THREE.Bone
    Recall_Props_Buffbone4: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Recall_Props_Buffbone2: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Recall_Props: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Idle1'
  | 'xinzhao_run'
  | 'Spell6'
  | 'Attack1_To_Idle'
  | 'Attack2_To_Idle'
  | 'Attack3'
  | 'Attack3_To_Idle'
  | 'IdleHaste_To_runHaste'
  | 'Idle_In'
  | 'Idle_In_Haste'
  | 'Idle_To_runHaste'
  | 'Run_Haste'
  | 'Spell1_Attack1'
  | 'Spell1_Attack1_To_Idle'
  | 'xinzhao_spell1_attack2_to_run'
  | 'Spell1_Attack2'
  | 'Spell1_Attack2_To_Idle'
  | 'xinzhao_spell1_attack1_to_run'
  | 'Spell1_Attack3'
  | 'Spell1_Attack3_To_Run'
  | 'xinzhao_spell2_stabandslash'
  | 'xinzhao_spell2_stabandslash_to_idle'
  | 'Spell3_DashToAlly'
  | 'Spell6_To_Idle'
  | 'Spell6_To_Run'
  | 'Recall'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Weapon2World} />
        <primitive object={nodes.Recall_Props_World} />
        <primitive object={nodes.Recall_Props_Buffbone1} />
        <primitive object={nodes.Recall_Props_Buffbone3} />
        <primitive object={nodes.Recall_Props_Buffbone4} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Recall_Props_Buffbone2} />
      </group>
      <group position={[-149.38, -56.08, -137.07]} scale={0.02}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall_Props}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
