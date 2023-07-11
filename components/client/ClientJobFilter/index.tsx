"use client"
import InputGroup from 'react-bootstrap/InputGroup';
import { endpoints } from '../../utils/endpoints';
import { useState, useEffect } from 'react';
import type { Skill } from '../../../src/app/api/utils/types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import SkillsBadges from '../../server/SkillsBadges';
import API from '../../../src/app/api/utils/api';
import './styles.css';

var qs = require('qs');
const api = new API();

type ClientJobFilterProps = {
    setFilteredJobs: any
}
export default function ClientJobFilter(props: ClientJobFilterProps) {
    const initialFilterState = {
        companyName: '',
        jobLocation: '',
        initialSalaryRange: '',
        finalSalaryRange: ''
    }
    const [selectedSkills, setSkillList] = useState([] as Skill[]);
    const [skills, setSkills] = useState([] as Skill[]);
    const [filterParams, setFilterParams] = useState(initialFilterState);
    const [selectValue, setSelectValue] = useState('Choose Skill')

    async function fetchData() {
        const hostname = 'http://' + window.location.host;
        const skills: Skill[] = (await api.instance.get(`${hostname}${endpoints.getSkills}`)).data;
        setSkills(skills);
    }
    useEffect(() => {
        fetchData();
        getJobs()
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

    const getJobs = async () => {
        const hostname = 'http://' + window.location.host;
        const postObj = {
            jobFilter: filterParams,
            skillsFilter: selectedSkills
        }
        const response = await api.instance.post(
            `${hostname}${endpoints.getJobsFiltered}`,
            postObj)
        props.setFilteredJobs(response.data)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Perform the desired action when the "Enter" key is pressed
            getJobs();
        }
    };

    return (
        <div>
            <div className='seeker-filter-container' >
                <Accordion style={{ width: '100%' }} onKeyDown={handleKeyDown} flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Job Filters</Accordion.Header>
                        <Accordion.Body>
                            <div className="acordeon-form-grid-3">
                                <Form.Group controlId="jobDescription">
                                    <Form.Label style={{ marginBottom: '2rem' }} >Company Name</Form.Label>
                                    <Form.Control
                                        onChange={e => onchangeInput(e, 'companyName')}
                                        type="text"
                                        placeholder=''
                                        defaultValue=''
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="jobLocation">
                                    <Form.Label style={{ marginBottom: '2rem' }}>Job location</Form.Label>
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
                                    <InputGroup >
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
                            </div>
                            <div className="acordeon-form-grid-2">
                                <Form.Group controlId="selectedSkill">
                                    {/* TODO: need to make a component out of this */}
                                    <Form.Label>Skills</Form.Label>
                                    <Form.Select onSelect={addSkill} onChange={addSkill} placeholder='Choose Skill' value={selectValue}>
                                        <option key="disabled">Choose Skill</option>
                                        {skills.map((skill) => (
                                            <option key={skill.skillName} value={JSON.stringify(skill)}>{skill.skillName}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <div style={{ marginTop: '10px' }}>
                                    <SkillsBadges
                                        skills={skills}
                                        selectedSkills={selectedSkills}
                                        setHandler={setSkillList}
                                        setValue={setSelectValue}
                                    />
                                    <Button
                                        onClick={getJobs}
                                        variant="primary"
                                        style={{ float: 'right', marginLeft: 'auto', width: '8rem', marginTop: '-25px' }}
                                    >Find Jobs</Button>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>

    )
}
