"use client"
import InputGroup from 'react-bootstrap/InputGroup';
import { endpoints } from '../../utils/endpoints';
import { useState, useEffect } from 'react';
import type { Skill } from '../../../src/app/api/utils/types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SkillsBadges from '../../server/SkillsBadges';
import API from '../../../src/app/api/utils/api';
import './styles.css';

var qs = require('qs');
const api = new API();


export default function ClientJobFilter() {
    const initialFilterState = {
        companyName: '',
        jobLocation: '',
        initialSalaryRange: '',
        finalSalaryRange: ''
    }
    const [selectedSkills, setSkillList] = useState([] as Skill[]);
    const [skills, setSkills] = useState([] as Skill[]);
    const [filterParams, setFilterParams] = useState(initialFilterState);
    const [resp, setResp] = useState({});


    async function fetchData() {
        const hostname = 'http://' + window.location.host;
        const skills: Skill[] = (await api.instance.get(`${hostname}${endpoints.getSkills}`)).data;
        setSkills(skills);
    }
    // console.log('filter', filterParams)
    // console.log('skilss', selectedSkills)
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', resp);
    useEffect(() => {
        fetchData();
    }, []);


    const addSkill = (el: any) => {
        const selected: Skill = JSON.parse(el.target.value);
        const assertion = selectedSkills.map(slected => slected.id == selected.id).includes(true)
        if (!assertion) {
            const skillList = structuredClone(selectedSkills)
            skillList.push(selected);
            setSkillList(skillList);
        }
    }

    const onchangeInput = (event: any, key: string) => {
        let newCreateJobObj = structuredClone(filterParams);
        (newCreateJobObj as any)[key] = event.target.value;
        if (key === 'initialSalaryRange' || key === 'finalSalaryRange') {
            (newCreateJobObj as any)[key] = parseFloat(event.target.value);
        }
        setFilterParams(newCreateJobObj);
    }

    const getJobs = () => {
        const hostname = 'http://' + window.location.host;
        console.log(filterParams);
        const postObj = {
            jobFilter: filterParams,
            skillsFilter: selectedSkills
        }
        const response = api.instance.post(`${hostname}${endpoints.getJobsFiltered}`,
        postObj)
        setResp(response)
    }

    return (
        <div>
            <div className='seeker-filter-container' >
                <Form.Group controlId="jobDescription">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                        onChange={e => onchangeInput(e, 'companyName')}
                        type="text"
                        placeholder=''
                        defaultValue=''
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="jobDescription">
                    <Form.Label>Job location</Form.Label>
                    <Form.Control
                        onChange={e => onchangeInput(e, 'jobLocation')}
                        type="text"
                        placeholder=''
                        defaultValue=''
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="Salary Range" className="mb-3">
                    <Form.Label>{'Salary Range'}</Form.Label>
                    <div >
                        <label className='sub-label' >Initial</label>
                        <label className='sub-label' style={{ float: 'right' }} >Final</label>
                    </div>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={e => onchangeInput(e, 'initialSalaryRange')}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            type="number"
                            aria-label="Initial"
                            placeholder={"3000"}
                            defaultValue=''
                        />
                        <Form.Control
                            onChange={e => onchangeInput(e, 'finalSalaryRange')}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            type="number"
                            aria-label="Final"
                            placeholder={"3000"}
                            defaultValue=''
                        />
                        <Form.Control.Feedback>OK!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            Only numbers accepted
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button
                    onClick={getJobs}
                    variant="primary"
                    style={{ float: 'right' }}
                >Find Jobs</Button>
            </div>
            <div>
                <Form.Group controlId="selectedSkill">
                    <Form.Label>Skills</Form.Label>
                    <Form.Select onSelect={addSkill} onChange={addSkill}>
                        {skills.map((skill) => (
                            <option key={skill.skillName} value={JSON.stringify(skill)}>{skill.skillName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <SkillsBadges skills={skills} selectedSkills={selectedSkills} setHandler={setSkillList} />
            </div>
        </div>

    )
}