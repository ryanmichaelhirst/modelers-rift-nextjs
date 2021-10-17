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
    Bullet1: THREE.Bone
    Bullet2: THREE.Bone
    Bullet3: THREE.Bone
    Bullet4: THREE.Bone
    Bullet5: THREE.Bone
    Bullet6: THREE.Bone
    Bullet7: THREE.Bone
    Bullet8: THREE.Bone
    Bullet9: THREE.Bone
    Bullet10: THREE.Bone
    Bullet11: THREE.Bone
    Bullet12: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    Buffbone_Glb_Weapon_1: THREE.Bone
    Buffbone_Cstm_Healthbar: THREE.Bone
    Pistol_World_Snap: THREE.Bone
    Revolver_World_Snap: THREE.Bone
    Sword_World_Snap: THREE.Bone
    Sword_Clip_World_Snap: THREE.Bone
    Diamond: THREE.Bone
    Coin: THREE.Bone
  }
  materials: {
    Sword: THREE.MeshBasicMaterial
    Recall: THREE.MeshBasicMaterial
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Channel'
  | 'Channel_Wndup'
  | 'crit_gun_start.samira'
  | 'Death'
  | 'Joke_Start'
  | 'Laugh'
  | 'Taunt'
  | 'Recall'
  | 'idle_gun_in.samira'
  | 'Spell3'
  | 'run_gun_haste.samira'
  | 'Dance_Start'
  | 'Passive'
  | 'idle_gun.samira'
  | 'Recall_Winddown'
  | 'attack1_gun_start.samira'
  | 'attack2_gun_start.samira'
  | 'attack1_sword.samira'
  | 'crit_sword.samira'
  | 'spell1_sword.samira'
  | 'spell2_dash.samira'
  | 'Spell4_Dash'
  | 'spell1_gun_into_idle.samira'
  | 'spell1_into_run_gun.samira'
  | 'run_gun.samira'
  | 'run_sword.samira'
  | 'spell1_gun.samira'
  | 'attack2_sword.samira'
  | 'spell1_during_dash.samira'
  | 'spell1_sword_into_run.samira'
  | 'Spell4_Loop'
  | 'run_ooc.samira'
  | 'run_sword_haste.samira'
  | 'spell1_sword_into_idle.samira'
  | 'idle_sword.samira'
  | 'idle_sword_in.samira'
  | 'idle_in.samira'
  | 'idle.samira'
  | 'run_ooc_haste.samira'
  | 'sheath_sword_run.samira'
  | 'sheath_gun_idle.samira'
  | 'sheath_gun_run.samira'
  | 'sheath_sword_idle.samira'
  | 'passive_melee.samira'
  | 'spell2.samira'
  | 'Spell2_Into_Idle'
  | 'spell2_180.samira'
  | 'spell2_90.samira'
  | 'spell2_45.samira'
  | 'Spell2_Into_Run'
  | 'spell2_-90.samira'
  | 'spell2_135.samira'
  | 'attack1_gun_into_idle.samira'
  | 'attack2_gun_into_idle.samira'
  | 'attack1_sword_into_idle.samira'
  | 'attack2_sword_into_idle.samira'
  | 'crit_sword_into_idle.samira'
  | 'crit_gun_into_idle.samira'
  | 'walkover_forward.samira'
  | 'walkover_right.samira'
  | 'walkover_left.samira'
  | 'attack_gun_into_run_front.samira'
  | 'spell1_into_run_gun_haste.samira'
  | 'attack1_sword_into_run.samira'
  | 'attack2_sword_into_run.samira'
  | 'spell1_during_dash_into_run.samira'
  | 'attack2_sword_hit.samira'
  | 'attack1_sword_hit.samira'
  | 'spell1_sword_run.samira'
  | 'attack1_gun_hit.samira'
  | 'attack2_gun_hit.samira'
  | 'attack_gun_into_run_left.samira'
  | 'attack_gun_into_run_right.samira'
  | 'crit_gun_hit.samira'
  | 'crit_sword_hit.samira'
  | 'Passive_Dash'
  | 'passive_into_idle.samira'
  | 'run_gun_boots.samira'
  | 'run_sword_boots.samira'
  | 'spell1_sword_into_run_haste.samira'
  | 'KnockUp'
  | 'Stun'
  | 'spell3_into_run.samira'
  | 'run_ooc_boots.samira'
  | 'Spell4_Start'
  | 'spell4_into_run.samira'
  | 'Respawn'
  | 'crit_sword_into_run_boots.samira'
  | 'passive_melee_into_idle.samira'
  | 'Joke_Loop'
  | 'Dance_Loop'
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
        <primitive object={nodes.Bullet1} />
        <primitive object={nodes.Bullet2} />
        <primitive object={nodes.Bullet3} />
        <primitive object={nodes.Bullet4} />
        <primitive object={nodes.Bullet5} />
        <primitive object={nodes.Bullet6} />
        <primitive object={nodes.Bullet7} />
        <primitive object={nodes.Bullet8} />
        <primitive object={nodes.Bullet9} />
        <primitive object={nodes.Bullet10} />
        <primitive object={nodes.Bullet11} />
        <primitive object={nodes.Bullet12} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.Buffbone_Glb_Weapon_1} />
        <primitive object={nodes.Buffbone_Cstm_Healthbar} />
        <primitive object={nodes.Pistol_World_Snap} />
        <primitive object={nodes.Revolver_World_Snap} />
        <primitive object={nodes.Sword_World_Snap} />
        <primitive object={nodes.Sword_Clip_World_Snap} />
        <primitive object={nodes.Diamond} />
        <primitive object={nodes.Coin} />
      </group>
      <group position={[-56.03, -50.57, -114.22]} scale={0.02}>
        <skinnedMesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Sword}
          skeleton={nodes.mesh_0.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials.Recall}
          skeleton={nodes.mesh_0_1.skeleton}
        />
        <skinnedMesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.Body}
          skeleton={nodes.mesh_0_2.skeleton}
        />
      </group>
    </group>
  )
}
