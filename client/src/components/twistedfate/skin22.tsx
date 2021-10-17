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
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Recall_L_Ejector: THREE.Bone
    Recall_R_Ejector: THREE.Bone
    Recall_Mask: THREE.Bone
    Recall_Deck1_Sec: THREE.Bone
    Recall_CardRoot3: THREE.Bone
    Recall_CardRoot1: THREE.Bone
    Recall_CardRoot2: THREE.Bone
    Recall_CardRoot4: THREE.Bone
    Recall_Root: THREE.Bone
    Recall01_Root: THREE.Bone
    Recall02_Root: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
    Glass: THREE.MeshBasicMaterial
    Recall_Deck: THREE.MeshBasicMaterial
    Recall_Pet: THREE.MeshBasicMaterial
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
  | 'twistedfate_skin13_recall.pie_c_10_21'
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
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Recall_L_Ejector} />
        <primitive object={nodes.Recall_R_Ejector} />
        <primitive object={nodes.Recall_Mask} />
        <primitive object={nodes.Recall_Deck1_Sec} />
        <primitive object={nodes.Recall_CardRoot3} />
        <primitive object={nodes.Recall_CardRoot1} />
        <primitive object={nodes.Recall_CardRoot2} />
        <primitive object={nodes.Recall_CardRoot4} />
        <primitive object={nodes.Recall_Root} />
        <primitive object={nodes.Recall01_Root} />
        <primitive object={nodes.Recall02_Root} />
      </group>
      <group position={[-69.96, 0.05, -38.25]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Glass}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Recall_Deck}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Recall_Pet}
          skeleton={nodes.mesh_0_3.skeleton}
        />
      </group>
    </group>
  )
}
