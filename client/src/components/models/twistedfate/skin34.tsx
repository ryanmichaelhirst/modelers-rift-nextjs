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
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    PlumePenRoot: THREE.Bone
    ContractPage1: THREE.Bone
    ContractPage2: THREE.Bone
    ContractPage3: THREE.Bone
    ContractPage4: THREE.Bone
    ContractPage5: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    PlumePen: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Death'
  | 'twistedfate_2012_idle1'
  | 'twistedfate_2012_idle2'
  | 'twistedfate_2012_laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3'
  | 'Spell4'
  | 'twistedfate_2012_taunt'
  | 'Attack3'
  | 'Attack4'
  | 'twistedfate_2012_recall_idle'
  | 'twistedfate_2012_recall'
  | 'KnockUp'
  | 'twistedfate_2012_idle_enter'
  | 'twistedfate_2012_joke.pie_c_legacy_bugs_10_18'
  | 'Dance_Loop'
  | 'twistedfate_2012_dance_windup'
  | 'twistedfate_2012_taunt2'
  | 'Walk'
  | 'Run1'
  | 'TurnL'
  | 'TurnR'
  | 'Turn0'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.PlumePenRoot} />
        <primitive object={nodes.ContractPage1} />
        <primitive object={nodes.ContractPage2} />
        <primitive object={nodes.ContractPage3} />
        <primitive object={nodes.ContractPage4} />
        <primitive object={nodes.ContractPage5} />
      </group>
      <group position={[-72.96, -4.91, -33.89]} scale={0.01}>
        <skinnedMesh geometry={nodes.mesh_0.geometry} material={materials.Body} skeleton={nodes.mesh_0.skeleton} />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.PlumePen}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
