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
    Recall_Rock_Root: THREE.Bone
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Snap2World_Star1: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Snap2World_Star2: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Recall_Rock: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
    Effect: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Recall'
  | 'aurelionsol_attack2'
  | 'Turn_0'
  | 'aurelionsol_turn_lft45_add'
  | 'aurelionsol_turn_rgt45_add'
  | 'aurelionsol_turn_lft90_add'
  | 'aurelionsol_turn_rgt90_add'
  | 'Spell4'
  | 'aurelionsol_attack1'
  | 'Spell2_Rgt90'
  | 'Spell2_Lft90'
  | 'Idle1_Base'
  | 'IdleIn'
  | 'Run1A'
  | 'Run1B'
  | 'Run1C'
  | 'Run1D'
  | 'Idlein2'
  | 'Death'
  | 'Spell1'
  | 'Spell3'
  | 'Spell1_2Run'
  | 'Taunt'
  | 'Joke_Loop'
  | 'Spell1_2Idle'
  | 'RunIn'
  | 'Idle2_Base'
  | 'Spell2_Rgt90_2run'
  | 'Spell2_Lft90_2run'
  | 'Spell4_2Idle'
  | 'aurelionsol_runspin'
  | 'aurelionsol_runspin2'
  | 'Respawn'
  | 'JokeIn'
  | 'Laugh'
  | 'Channel'
  | 'Channel_Wndup'
  | 'DanceIn'
  | 'DanceLoop'
  | 'Recall_Winddown'
  | 'Spell3_Run'
  | 'Run2A'
  | 'Run2B'
  | 'Run2C'
  | 'Run2D'
  | 'Run2E'
  | 'Run2F'
  | 'Run2G'
  | 'Run2H'
  | 'Run_Hastea'
  | 'Run_Hasteb'
  | 'Run_Hastec'
  | 'Run_Hasted'
  | 'Spell4_ToRun'
  | 'Spell2_Lft90_2RunHaste'
  | 'Spell2_Rgt90_2RunHaste'
  | 'aurelionsol_hasterunin'
  | 'Spell1_2RuHaste'
  | 'aurelionsol_runa_torunhasteb'
  | 'Run_ToRunHaste'
  | 'aurelionsol_spell1_inflight'
  | 'aurelionsol_idle1'
  | 'Spell2_Lft90_2Idle'
  | 'Spell2_Rgt90_2Idle'
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
        <primitive object={nodes.Recall_Rock_Root} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Snap2World_Star1} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Snap2World_Star2} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <group position={[-193.53, -42.77, -451.93]} scale={0.04}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Recall_Rock}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Effect}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
