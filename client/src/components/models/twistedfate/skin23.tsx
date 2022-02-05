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
    Root: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Recall_Root: THREE.Bone
    RecallRose1: THREE.Bone
    RecallRose2: THREE.Bone
    RecallRose3: THREE.Bone
    Recall_Deck1_Sec: THREE.Bone
    Recall_CardRoot3: THREE.Bone
    Recall_CardRoot1: THREE.Bone
    Recall_CardRoot2: THREE.Bone
    Recall_CardRoot4: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Pillar: THREE.MeshBasicMaterial
    Trophy: THREE.MeshBasicMaterial
    Rose: THREE.MeshBasicMaterial
    Recall_Deck: THREE.MeshBasicMaterial
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
  | 'twistedfate_taunt.pie_c_11_9'
  | 'Attack3'
  | 'Attack4'
  | 'KnockUp'
  | 'twistedfate_2012_idle_enter'
  | 'twistedfate_2012_joke.pie_c_legacy_bugs_10_18'
  | 'Dance_Loop'
  | 'twistedfate_2012_dance_windup'
  | 'Walk'
  | 'Run1'
  | 'TurnL'
  | 'TurnR'
  | 'Turn0'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.RecallRose1} />
        <primitive object={nodes.RecallRose2} />
        <primitive object={nodes.RecallRose3} />
        <primitive object={nodes.Recall_Deck1_Sec} />
        <primitive object={nodes.Recall_CardRoot3} />
        <primitive object={nodes.Recall_CardRoot1} />
        <primitive object={nodes.Recall_CardRoot2} />
        <primitive object={nodes.Recall_CardRoot4} />
      </group>
      <group position={[-103.75, -36.75, -111.09]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Pillar}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Trophy}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Rose}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Recall_Deck}
          skeleton={nodes.mesh_0_4.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
