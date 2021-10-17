import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Orange1: THREE.Bone
    Orange2: THREE.Bone
    Orange3: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Snap_Sword2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
  }
  materials: {
    Gangplank_Skin05_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Laugh'
  | 'Run_Base'
  | 'gangplank_skin05_spell1'
  | 'gangplank_spell2'
  | 'Spell3_Upper'
  | 'gangplank_spell4'
  | 'Taunt'
  | 'IdleIn'
  | 'Crit2'
  | 'Passive_Attack'
  | 'Channel_In'
  | 'Recall_In'
  | 'RunIn'
  | 'RunIN2'
  | 'Spell1_Alt2'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'gangplank_spell3'
  | 'Recall_Loop'
  | 'Spell2_Idle_TRA'
  | 'Run_Haste'
  | 'Recall_Winddown'
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
        <primitive object={nodes.Orange1} />
        <primitive object={nodes.Orange2} />
        <primitive object={nodes.Orange3} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Snap_Sword2World} />
        <primitive object={nodes.Snap_Weapon2World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Gangplank_Skin05_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-141.61, -11.22, -36.57]}
        scale={0.02}
      />
    </group>
  )
}
