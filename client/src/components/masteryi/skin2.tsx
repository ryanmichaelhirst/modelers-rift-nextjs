import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
  }
  materials: {
    lambert3: THREE.MeshBasicMaterial
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
  | 'masteryi_2013_laugh'
  | 'Recall_In'
  | 'Run'
  | 'masteryi_2013_spell2'
  | 'masteryi_2013_taunt'
  | 'masteryi_2013_idle_enter'
  | 'Spell2_In'
  | 'Spell2_Loop'
  | 'Recall_Loop'
  | 'Stun'
  | 'masteryi_2013_passive'
  | 'Channel_Wndup'
  | 'Dance'
  | 'Run_Fast'
  | 'Run_Haste'
  | '2013_Run_Haste'
  | 'masteryi_chosen_joke'
  | 'Recall_Winddown'
  | 'Respawn'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Model(
  props: JSX.IntrinsicElements['group'] & { glb: any; timerLabel: string },
) {
  const ref = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF(props.glb) as GLTFResult
  useCycleAnimations<GLTFActions>({ animations, ref, timerLabel: props.timerLabel })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.lambert3}
        skeleton={nodes.mesh_0.skeleton}
      />
    </group>
  )
}
