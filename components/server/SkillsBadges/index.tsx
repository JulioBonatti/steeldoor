import './styles.css';
import type { Dispatch, SetStateAction } from 'react';


type Skill = {
    id: string,
    skillName: string,
}

type SkillbadgesProps = {
    skills: Skill[],
    selectedSkills: Skill[]
    setHandler: Dispatch<SetStateAction<Skill[]>>
}

export default function SkillsBadges(props: SkillbadgesProps) {

    const removeSkill = (skill: Skill) => {
        const filteredSkills = props.selectedSkills
            .filter(actualSkill => actualSkill.skillName !== skill.skillName);
        props.setHandler(filteredSkills);
    }

    return (
        <div className="skills-container" style={{ marginTop: '12px' }}>
            <strong style={{ fontSize: '14px', marginRight: '6px', fontWeight: 100}}>Click to remove:</strong>
            {props.selectedSkills.map(skill => {
                return (
                    <div
                        key={skill.skillName}
                        onClick={() => removeSkill(skill)}
                        className="skill-badge">
                        {skill.skillName}
                    </div>
                )
            })}
        </div>
    );
}