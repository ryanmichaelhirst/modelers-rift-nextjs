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
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
  }
  materials: {
    Kaisa_Body_Mat: THREE.MeshBasicMaterial
    Kaisa_Membrane_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'tft6_kaisa_attack1.tft_set6'
  | 'tft6_kaisa_attack2.tft_set6'
  | 'Crit'
  | 'Death'
  | 'Run'
  | 'Idle1'
  | 'Celebration'
  | 'tft6_kaisa_attack3.tft_set6'
  | 'tft6_kaisa_spell.tft_set6'
  | 'tft6_kaisa_spell_toidle.tft_set6'
  | 'tft6_kaisa_spellbig.tft_set6'
  | 'tft6_kaisa_spellbig_toidle.tft_set6'
  | 'tft6_kaisa_fastattack1.tft_set6'
  | 'tft6_kaisa_fastattack2.tft_set6'
  | 'tft6_kaisa_fastattack3.tft_set6'
  | 'tft6_kaisa_helmet.tft_set6'
  | 'tft6_kaisa_dash_in.tft_set6'
  | 'tft6_kaisa_dash_loop.tft_set6'
  | 'tft6_kaisa_challenger_dash_in.tft_set6'
  | 'tft6_kaisa_challenger_dash_loop.tft_set6'
  | 'tft6_kaisa_dash_out.tft_set6'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
      </group>
      <group position={[-56.01, -0.08, -104.75]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Kaisa_Body_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Kaisa_Membrane_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
      </group>
    </group>
  )
}, areEqual)

export default Model
