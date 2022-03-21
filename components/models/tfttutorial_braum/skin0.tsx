import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Origin: THREE.Bone
    Poro: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Braum: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Celebration'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Idle1'
  | 'Spell3_Punchright45'
  | 'Spell3_Punchright179'
  | 'Spell3_Punchleft-45'
  | 'Spell3_Punchleft-179'
  | 'Spell3_Punch-45'
  | 'Spell3_Punch45'
  | 'Spell3_Punch-179'
  | 'Spell3_Punch179'
  | 'Spell3_Punch-135'
  | 'Spell3_Punch135'
  | 'Spell3_Punch0-45'
  | 'Spell3_Punch045'
  | 'Spell3_Punch0-179'
  | 'Spell3_Punch0179'
  | 'Spell3_Punch0'
  | 'tfttutorial_braum_spell3_punch045.tft_tutorial_v2'
  | 'tfttutorial_braum_spell3_punch0-45.tft_tutorial_v2'
  | 'Spell'
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
        <primitive object={nodes.Origin} />
        <primitive object={nodes.Poro} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Braum}
        skeleton={nodes.mesh_0.skeleton}
        position={[-92.87, -0.64, -40.8]}
        scale={0.02}
      />
    </group>
  )
}, areEqual)

export default Model
