export interface RoomProps {
    floorColor: string,
    wallBackColor: string,
    wallLeftColor: string,
    wallRightColor: string,
    size: { width: number, depth: number, height: number },
    position: number[],
}

const Room = (props: RoomProps) => {
    const { floorColor, wallBackColor, wallLeftColor, wallRightColor, size, position } = props;

    return (
        <group>
            <mesh rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                <planeBufferGeometry args={[size.width, size.depth]} />
                <meshStandardMaterial color={floorColor} />
            </mesh>
            <mesh rotation={[0,Math.PI/2, 0]} position={[-size.width/2, size.height/2, 0]} receiveShadow>
                <planeBufferGeometry args={[size.depth, size.height]} />
                <meshStandardMaterial color={wallLeftColor} />
            </mesh>
            <mesh position={[0, size.height/2, -size.depth/2]} receiveShadow>
                <planeBufferGeometry args={[size.width, size.height]} />
                <meshStandardMaterial color={wallBackColor} />
            </mesh>
            <mesh rotation={[0,-Math.PI/2,0]} position={[size.width/2, size.height/2, 0]} receiveShadow>
                <planeBufferGeometry args={[size.depth, size.height]} />
                <meshStandardMaterial color={wallRightColor} />
            </mesh>
      </group>
    )
  }

export default Room