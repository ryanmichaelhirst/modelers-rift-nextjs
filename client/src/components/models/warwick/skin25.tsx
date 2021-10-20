import useCycleAnimations from '@hooks/UseCycleAnimation'
import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
  }
  materials: {
    Warwick_Grey_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Attack1'
  | 'Channel'
  | 'Crit'
  | 'Death'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2'
  | 'Spell4'
  | 'Taunt'
  | 'Attack1Fast'
  | 'warwick_attackfast1'
  | 'warwick_attack1'
  | 'Attack2Fast'
  | 'warwick_attackfast2'
  | 'warwick_attack2'
  | 'Attack3Fast'
  | 'warwick_attackfast3'
  | 'warwick_attack3'
  | 'Attack4Fast'
  | 'warwick_attackfast4'
  | 'warwick_attack4'
  | 'Dance_Loop'
  | 'Dance_Windup'
  | 'Idle1_Base'
  | 'warwick_idle_v1'
  | 'Joke'
  | 'Recall'
  | 'Recall_Leadout'
  | 'Recall_Winddown'
  | 'warwick_runarmsback_to_runquad'
  | 'warwick_run_armsback'
  | 'warwick_runhunt'
  | 'RunHUnt_To_Idle'
  | 'RunStart'
  | 'Run_Base'
  | 'Run_Haste'
  | 'Run_To_Idle'
  | 'Run_Var1'
  | 'Run_Var2'
  | 'Respawn'
  | 'warwick_spell1_turn'
  | 'Spell1_Release'
  | 'Spell1_Turn'
  | 'warwick_spell2miss'
  | 'Spell2Miss_Run'
  | 'Spell2_To_Idle'
  | 'Spell2_To_RunHunt'
  | 'warwick_spell3_howl'
  | 'Spell3_Howl_Run'
  | 'Spell3_Idle'
  | 'Spell3_Run'
  | 'Spell4Dash'
  | 'Spell4Hit'
  | 'Spell4Miss'
  | 'Spell4Miss_to_Idle'
  | 'TurnHunt_-180'
  | 'TurnHunt_-90'
  | 'TurnHunt_0'
  | 'TurnHunt_180'
  | 'TurnHunt_90'
  | 'Turn_-180'
  | 'Turn_-90'
  | 'Turn_0'
  | 'Turn_180'
  | 'Turn_90'
  | 'Channel_In'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Warwick_Grey_MAT}
        skeleton={nodes.mesh_0.skeleton}
        position={[-114.55, -0.32, -294.5]}
        scale={0.02}
      />
    </group>
  )
}
