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
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    C_Buffbone_Cstm_Healthbar_Loc: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Snap_R_Gem2World: THREE.Bone
    Snap_L_Gem2World: THREE.Bone
    Jacket: THREE.Bone
  }
  materials: {
    Taric_Pool_Party_MAT: THREE.MeshBasicMaterial
    Taric_Pool_Party_Body_Jacket_MAT: THREE.MeshBasicMaterial
    Taric_PoolParty_Jacket_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Attack2'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance_Windup'
  | 'Death'
  | 'Idle1_Base'
  | 'Laugh'
  | 'Taunt'
  | 'taric_run'
  | 'Spell1'
  | 'Spell2'
  | 'Spell3_0'
  | 'Spell4_Idle'
  | 'taric_joke_1_start_skin04'
  | 'taric_gems_idle'
  | 'Attack3'
  | 'Spell3_-90'
  | 'Spell3_90'
  | 'taric_run_to_idle'
  | 'Spell3_Run_0'
  | 'Spell3_Run_-90'
  | 'Spell3_Run_90'
  | 'Spell3_180'
  | 'Spell3_-180'
  | 'Spell3_Run_180'
  | 'Spell3_Run_-180'
  | 'Passive_Attack1'
  | 'Passive_Attack2'
  | 'Idle2_Base'
  | 'Turn_-180'
  | 'Turn_180'
  | 'Turn_-90'
  | 'Turn_90'
  | 'taric_respawn'
  | 'Turn_0'
  | 'Joke_2'
  | 'Joke_3'
  | 'taric_joke_4_end_skin04'
  | 'Dance_Loop'
  | 'Run_Homeguard'
  | 'Spell4_Run'
  | 'Recall'
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
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.C_Buffbone_Cstm_Healthbar_Loc} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Snap_R_Gem2World} />
        <primitive object={nodes.Snap_L_Gem2World} />
        <primitive object={nodes.Jacket} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Taric_Pool_Party_MAT}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.Taric_Pool_Party_Body_Jacket_MAT}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Taric_PoolParty_Jacket_MAT}
        skeleton={nodes.mesh_0_2.skeleton}
      />
    </group>
  )
}
