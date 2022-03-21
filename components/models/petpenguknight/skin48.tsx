import * as THREE from 'three'
import { useAnimationResult, AnimatedModelProps } from '@customtypes/index'
import React, { FC, memo, useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.SkinnedMesh
    Root: THREE.Bone
    C_Buffbone_Glb_Layout_Loc: THREE.Bone
    C_Buffbone_Glb_Center_Loc: THREE.Bone
    Buffbone_Glb_Ground_Loc: THREE.Bone
    C_Buffbone_Glb_Overhead_Loc: THREE.Bone
    Buffbone_Glb_Channel_Loc: THREE.Bone
    True_World: THREE.Bone
  }
  materials: {
    Body: THREE.MeshBasicMaterial
  }
}

type ActionName =
  | 'Run_Base'
  | 'Taunt'
  | 'Celebrate'
  | 'Run_To_Idle'
  | 'Joke'
  | 'pengu_idle1.littlelegends_spiritblossom_10_16'
  | 'Recall'
  | 'Recall_Winddown'
  | 'Run_Haste'
  | 'Dance_Loop'
  | 'Dance_Intro'
  | 'Idle_To_Run'
  | 'Death'
  | 'Turn_0'
  | 'Turn_R'
  | 'Turn_L'
  | 'Interact'
  | 'Cast_Cycle'
  | 'Cast_Animation'
  | 'pengu_damage.littlelegends_spiritblossom_10_16'
  | 'pengu_idle2.littlelegends_spiritblossom_10_16'
  | 'Idle_To_runHaste'
  | 'pengu_idle3.littlelegends_spiritblossom_10_16'
  | 'Greeting'
  | 'Dive_In'
  | 'Dive_Out'
  | 'Cast_Damage'
  | 'pengu_joke.littlelegends_spiritblossom_10_16'
  | 'pengu_taunt.littlelegends_spiritblossom_10_16'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const areEqual = (prevProps: AnimatedModelProps, nextProps: AnimatedModelProps) => {
  if (prevProps.timerLabel === nextProps.timerLabel) return true

  return false
}

const Model: FC<AnimatedModelProps> = memo(({ glbUrl, onSetAnimationMixer }) => {
  const { nodes, materials, animations } = useGLTF(glbUrl) as GLTF & {
    nodes: Record<string, THREE.SkinnedMesh>
    materials: Record<string, THREE.MeshBasicMaterial>
  }
  const ref = useRef()
  const { mixer, names, actions, clips } = useAnimations(animations, ref)

  useEffect(() => {
    onSetAnimationMixer({ mixer, names, actions, clips })
  }, [])

  return (
    <group ref={ref} dispose={null}>
      <group scale={[-1, 1, 1]}>
        <primitive object={nodes.Root} />
        <primitive object={nodes.C_Buffbone_Glb_Layout_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Center_Loc} />
        <primitive object={nodes.Buffbone_Glb_Ground_Loc} />
        <primitive object={nodes.C_Buffbone_Glb_Overhead_Loc} />
        <primitive object={nodes.Buffbone_Glb_Channel_Loc} />
        <primitive object={nodes.True_World} />
      </group>
      <skinnedMesh
        geometry={nodes.mesh_0.geometry}
        material={materials.Body}
        skeleton={nodes.mesh_0.skeleton}
        position={[-54.17, -0.56, -37.58]}
        scale={0.01}
      />
    </group>
  )
}, areEqual)

export default Model
