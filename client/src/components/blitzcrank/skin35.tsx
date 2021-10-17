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
    mesh_0_6: THREE.SkinnedMesh
    mesh_0_7: THREE.SkinnedMesh
    mesh_0_8: THREE.SkinnedMesh
    Root: THREE.Bone
    C_BUFFBONE_GLB_CENTER_LOC: THREE.Bone
    BUFFBONE_GLB_CHANNEL_LOC: THREE.Bone
    C_BUFFBONE_GLB_OVERHEAD_LOC: THREE.Bone
    C_BUFFBONE_GLB_LAYOUT_LOC: THREE.Bone
    BUFFBONE_GLB_GROUND_LOC: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    R_ElbowNoodle_01_Root: THREE.Bone
    Airbag: THREE.Bone
    CatA_Root: THREE.Bone
    CatB_Root: THREE.Bone
    CatC_Root: THREE.Bone
    CatD_Root: THREE.Bone
    CatE_Root: THREE.Bone
    Key_Purple_Main: THREE.Bone
    Key_Red_Main: THREE.Bone
    Key_Blue_Main: THREE.Bone
    Key_Green_Main: THREE.Bone
    Key_Orange_Main: THREE.Bone
    Parachute_Root: THREE.Bone
  }
  materials: {
    Robot_Mat: THREE.MeshBasicMaterial
    Head_Shield_Mat: THREE.MeshBasicMaterial
    CatB_Mat: THREE.MeshBasicMaterial
    Crank_Face_Mat: THREE.MeshBasicMaterial
    Blitz_Face_Mat: THREE.MeshBasicMaterial
    Cat_3_4_Mat: THREE.MeshBasicMaterial
    Cat_5_Mat: THREE.MeshBasicMaterial
    Key_Mat: THREE.MeshBasicMaterial
    Parachute_Mat: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'attack1.pie_c_11_7'
  | 'attack2.pie_c_11_7'
  | 'Channel'
  | 'Channel_Wndup'
  | 'Crit'
  | 'Dance'
  | 'Death'
  | 'Idle1'
  | 'Idle2'
  | 'Laugh'
  | 'Spell1'
  | 'Spell2_Run'
  | 'Spell3'
  | 'Spell4'
  | 'Taunt_In'
  | 'Recall'
  | 'Spell2_In'
  | 'Run01'
  | 'Run02'
  | 'run01_toidle1.pie_c_11_7'
  | 'idle1_torun01.pie_c_11_7'
  | 'spell1_success.pie_c_11_7'
  | 'Spell1_Out'
  | 'attack3.pie_c_11_7'
  | 'attack4.pie_c_11_7'
  | 'Spell2_Out'
  | 'Spell4_Out'
  | 'Spell3_ToIdle'
  | 'Spell3_ToRun'
  | 'homeguard_in.pie_c_11_7'
  | 'homeguard_loop.pie_c_11_7'
  | 'Taunt_loop'
  | 'Joke_In'
  | 'Joke_Loop'
  | 'Respawn'
  | 'homeguard_torun.pie_c_11_7'
  | 'homeguard_toidle.pie_c_11_7'
  | 'Spawn'
  | 'Spell2_Idle'
  | 'spell2_run_toidle.pie_c_11_7'
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
        <primitive object={nodes.C_BUFFBONE_GLB_CENTER_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_CHANNEL_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_OVERHEAD_LOC} />
        <primitive object={nodes.C_BUFFBONE_GLB_LAYOUT_LOC} />
        <primitive object={nodes.BUFFBONE_GLB_GROUND_LOC} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.R_ElbowNoodle_01_Root} />
        <primitive object={nodes.Airbag} />
        <primitive object={nodes.CatA_Root} />
        <primitive object={nodes.CatB_Root} />
        <primitive object={nodes.CatC_Root} />
        <primitive object={nodes.CatD_Root} />
        <primitive object={nodes.CatE_Root} />
        <primitive object={nodes.Key_Purple_Main} />
        <primitive object={nodes.Key_Red_Main} />
        <primitive object={nodes.Key_Blue_Main} />
        <primitive object={nodes.Key_Green_Main} />
        <primitive object={nodes.Key_Orange_Main} />
        <primitive object={nodes.Parachute_Root} />
      </group>
      <group position={[-83.94, -49.55, -49.92]} scale={0.01}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Robot_Mat}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Head_Shield_Mat}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.CatB_Mat}
          skeleton={nodes.mesh_0_2.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_3.geometry}
          material={materials.Crank_Face_Mat}
          skeleton={nodes.mesh_0_3.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_4.geometry}
          material={materials.Blitz_Face_Mat}
          skeleton={nodes.mesh_0_4.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_5.geometry}
          material={materials.Cat_3_4_Mat}
          skeleton={nodes.mesh_0_5.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_6.geometry}
          material={materials.Cat_5_Mat}
          skeleton={nodes.mesh_0_6.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_7.geometry}
          material={materials.Key_Mat}
          skeleton={nodes.mesh_0_7.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_8.geometry}
          material={materials.Parachute_Mat}
          skeleton={nodes.mesh_0_8.skeleton}
        />
      </group>
    </group>
  )
}
