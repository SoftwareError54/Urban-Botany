import { Routes, Route } from 'react-router-dom';
import ProjectsTips from './ProjectsTips';
import Bonsai from './projects/Bonsai';
import WateringTechniques from './tips/WateringTechniques';
import Repotting from './tips/Repotting';

export default function Projects() {
    return (
        <Routes>
            <Route path="/" element={<ProjectsTips />} />
            <Route path="bonsai" element={<Bonsai />} />
            <Route path="tips/watering-techniques" element={<WateringTechniques />} />
            <Route path="tips/repotting" element={<Repotting />} />
        </Routes>
    );
}
