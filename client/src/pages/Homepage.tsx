import React from "react";

interface PropsDef {
    name: string;
    depth: number;
};

const Homepage = (props: Required<PropsDef>) => {
    return (
        <div>
            Time to start coding!
        </div>
    );
};

export default Homepage;