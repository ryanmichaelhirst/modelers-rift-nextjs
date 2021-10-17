import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    mesh_0_1: THREE.SkinnedMesh
    mesh_0_2: THREE.SkinnedMesh
    mesh_0_3: THREE.SkinnedMesh
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
    tent_arm_Tip1: THREE.Bone
    tent_Root: THREE.Bone
    Hole_root: THREE.Bone
    monster: THREE.Bone
  }
  materials: {
    Gangplank_SpacePirate_MAT3: THREE.MeshBasicMaterial
    TENTACLE_MAT: THREE.MeshBasicMaterial
    ALIEN_MAT: THREE.MeshBasicMaterial
    SMALL_TENTACLE: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel_In'
  | 'Channel_Loop'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Crit2'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'IdleIn'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Laugh'
  | 'Passive_Attack'
  | 'Recall'
  | 'gangplank_idle1'
  | 'Recall_Winddown'
  | 'Respawn'
  | 'RunIn'
  | 'RunIN2'
  | 'Run_Base'
  | 'Run_Haste'
  | 'gangplank_spell1_alt1'
  | 'Spell1_Alt2'
  | 'gangplank_spell1'
  | 'Spell2_Idle_TRA'
  | 'gangplank_spell2'
  | 'gangplank_spell3'
  | 'Spell3_Upper'
  | 'gangplank_spell4'
  | 'Taunt'
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
        <primitive object={nodes.tent_arm_Tip1} />
        <primitive object={nodes.tent_Root} />
        <primitive object={nodes.Hole_root} />
        <primitive object={nodes.monster} />
      </group>
      <group position={[-163.95, -16.61, -86.1]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Gangplank_SpacePirate_MAT3}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.TENTACLE_MAT}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.ALIEN_MAT}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.SMALL_TENTACLE}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}
