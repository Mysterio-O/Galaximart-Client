import React, { useEffect, useState } from 'react';
import LetterGlitch from './LetterGlitch';
import ParalaxContainer from './ParalaxContainer';

const Paralax = () => {

    const [isGlitch, setIsGlitch] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsGlitch(false);
        }, 3000);
    }, [])

    return (



        <div>
            {
                isGlitch ? <div className="min-h-screen">
                    <LetterGlitch
                        glitchSpeed={50}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}

                    />
                </div>
                    : <ParalaxContainer />
            }
        </div>



    );
};

export default Paralax;