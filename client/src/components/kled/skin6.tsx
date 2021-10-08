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
    mesh_0_4: THREE.SkinnedMesh
    mesh_0_5: THREE.SkinnedMesh
    Mount_Root: THREE.Bone
    Mount_buffbone_glb_channel_loc: THREE.Bone
    Mount_C_Buffbone_Glb_Layout_Loc: THREE.Bone
    Mount_C_Buffbone_Glb_Center_Loc: THREE.Bone
    Mount_Buffbone_Glb_Ground_Loc: THREE.Bone
    Mount_C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Mount_PumpkinUlt: THREE.Bone
    Root: THREE.Bone
    Snap_C_Fish1_2World: THREE.Bone
    Snap_C_Fish2_2World: THREE.Bone
    Snap_Gun2World: THREE.Bone
    Snap_Weapon2World: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Snap_C_Fish_Cut_Rear_2World: THREE.Bone
    Snap_C_Fish_Cut_Front_2World: THREE.Bone
    Snap_C_Fish_Cut_Mover_2World: THREE.Bone
    Poro01_Root: THREE.Bone
    Poro02_Root: THREE.Bone
    Poro03_Root: THREE.Bone
    Door: THREE.Bone
    Cauldron: THREE.Bone
  }
  materials: {
    KledMount_Skin02_Mat: THREE.MeshBasicMaterial
    temp2_KledMount_Skin02_Mat: THREE.MeshBasicMaterial
    Pumpkin: THREE.MeshBasicMaterial
    Kled_Rider_Harrowing_MAT: THREE.MeshBasicMaterial
    Skin02_Recall_Poro_MAT: THREE.MeshBasicMaterial
    Skin02_Recall_MAT: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Joke_Into'
  | 'Run_Fast'
  | 'Taunt'
  | 'Turn90'
  | 'Turn-90'
  | 'Attack1'
  | 'Run0_to_1'
  | 'Run0_In'
  | 'Idle0'
  | 'Idle_In'
  | 'Idle2'
  | 'Idle3'
  | 'Spell2_1'
  | 'Spell2_2'
  | 'Spell2_3'
  | 'Attack2'
  | 'Dance_Start'
  | 'Dance_Loop'
  | 'kled_run0_lookat_l60'
  | 'kled_run0_lookat_r60'
  | 'kled_run0_lookat_0'
  | 'Spell3_To_Run'
  | 'Spell3'
  | 'kled_spell2'
  | 'Spell1'
  | 'Spell2_To_Idle'
  | 'Attack3'
  | 'Recall'
  | 'Laugh'
  | 'Run1_to_0'
  | 'kled_skin02_spell4'
  | 'Run_Injured'
  | 'Spell4_Into'
  | 'Spell4_OutAttack'
  | 'Spell4_To_Run0'
  | 'Spell1_To_Run'
  | 'Spell4_Cycle_to_Run0'
  | 'Mount_On_To_Run'
  | 'RunHaste'
  | 'Spell1_2'
  | 'Crit'
  | 'Spell1_To_Idle'
  | 'Run_Celebrate'
  | 'Joke_Loop'
  | 'Joke_2_Into'
  | 'Joke_2_Loop'
  | 'Death'
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
        <primitive object={nodes.Mount_Root} />
        <primitive object={nodes.Mount_buffbone_glb_channel_loc} />
        <primitive object={nodes.Mount_C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.Mount_C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Mount_Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.Mount_C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Mount_PumpkinUlt} />
        <primitive object={nodes.Root} />
        <primitive object={nodes.Snap_C_Fish1_2World} />
        <primitive object={nodes.Snap_C_Fish2_2World} />
        <primitive object={nodes.Snap_Gun2World} />
        <primitive object={nodes.Snap_Weapon2World} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Snap_C_Fish_Cut_Rear_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Front_2World} />
        <primitive object={nodes.Snap_C_Fish_Cut_Mover_2World} />
        <primitive object={nodes.Poro01_Root} />
        <primitive object={nodes.Poro02_Root} />
        <primitive object={nodes.Poro03_Root} />
        <primitive object={nodes.Door} />
        <primitive object={nodes.Cauldron} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.KledMount_Skin02_Mat}
        skeleton={nodes.mesh_0.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_1.geometry}
        material={materials.temp2_KledMount_Skin02_Mat}
        skeleton={nodes.mesh_0_1.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_2.geometry}
        material={materials.Pumpkin}
        skeleton={nodes.mesh_0_2.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_3.geometry}
        material={materials.Kled_Rider_Harrowing_MAT}
        skeleton={nodes.mesh_0_3.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_4.geometry}
        material={materials.Skin02_Recall_Poro_MAT}
        skeleton={nodes.mesh_0_4.skeleton}
      />
      <skinnedMesh
        geometry={nodes.mesh_0_5.geometry}
        material={materials.Skin02_Recall_MAT}
        skeleton={nodes.mesh_0_5.skeleton}
      />
    </group>
  )
}
